from __future__ import annotations

import shutil
import signal
import subprocess
import sys
import threading
import time
from pathlib import Path


ROOT = Path(__file__).resolve().parent
BACKEND_DIR = ROOT / "backend_ai-voice-assistant"
FRONTEND_DIR = ROOT / "frontend_ai-voice-assistant"


def _pick_python() -> list[str]:
    venv_python = BACKEND_DIR / ".venv" / "Scripts" / "python.exe"
    if venv_python.exists():
        return [str(venv_python)]

    if shutil.which("py"):
        return ["py", "-3.10"]

    if shutil.which("python"):
        return ["python"]

    raise RuntimeError("Python executable not found. Install Python 3.10+ first.")


def _pick_npm() -> str:
    npm_path = shutil.which("npm.cmd") or shutil.which("npm")
    if not npm_path:
        raise RuntimeError("npm not found. Install Node.js first.")
    return npm_path


def _stream_output(name: str, proc: subprocess.Popen[str]) -> None:
    assert proc.stdout is not None
    for line in proc.stdout:
        print(f"[{name}] {line.rstrip()}", flush=True)


def _terminate(proc: subprocess.Popen[str], name: str) -> None:
    if proc.poll() is not None:
        return
    print(f"[runner] stopping {name} ...", flush=True)
    proc.terminate()
    try:
        proc.wait(timeout=8)
    except subprocess.TimeoutExpired:
        proc.kill()
        proc.wait(timeout=5)


def _check_backend_prereqs(python_cmd: list[str]) -> tuple[bool, str]:
    probe = subprocess.run(
        python_cmd + ["-c", "import fastapi, uvicorn"],
        capture_output=True,
        text=True,
    )
    if probe.returncode == 0:
        return True, ""
    return False, (probe.stderr or probe.stdout or "Unknown dependency error").strip()


def main() -> int:
    if not BACKEND_DIR.exists() or not FRONTEND_DIR.exists():
        print("[runner] Required folders not found.", flush=True)
        return 1

    try:
        python_cmd = _pick_python()
        npm_cmd = _pick_npm()
    except RuntimeError as ex:
        print(f"[runner] {ex}", flush=True)
        return 1

    ok, dep_error = _check_backend_prereqs(python_cmd)
    if not ok:
        print("[runner] Backend dependencies are missing in the selected Python environment.", flush=True)
        print(f"[runner] Interpreter: {' '.join(python_cmd)}", flush=True)
        print(f"[runner] Detail: {dep_error}", flush=True)
        print("[runner] Fix: run this command and retry:", flush=True)
        print(f"[runner]   {' '.join(python_cmd)} -m pip install -r requirements-py310.txt", flush=True)
        return 1

    backend_cmd = python_cmd + [
        "-m",
        "uvicorn",
        "api_server:app",
        "--host",
        "0.0.0.0",
        "--port",
        "8000",
        "--reload",
    ]
    frontend_cmd = [npm_cmd, "run", "dev"]

    print("[runner] starting backend and frontend ...", flush=True)
    print(f"[runner] backend cwd:  {BACKEND_DIR}", flush=True)
    print(f"[runner] frontend cwd: {FRONTEND_DIR}", flush=True)
    print("[runner] backend url:  http://localhost:8000/docs", flush=True)
    print("[runner] frontend url: http://localhost:8080", flush=True)

    backend_proc = subprocess.Popen(
        backend_cmd,
        cwd=str(BACKEND_DIR),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
    )
    frontend_proc = subprocess.Popen(
        frontend_cmd,
        cwd=str(FRONTEND_DIR),
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        bufsize=1,
    )

    threads = [
        threading.Thread(target=_stream_output, args=("backend", backend_proc), daemon=True),
        threading.Thread(target=_stream_output, args=("frontend", frontend_proc), daemon=True),
    ]
    for t in threads:
        t.start()

    def _shutdown(*_: object) -> None:
        _terminate(backend_proc, "backend")
        _terminate(frontend_proc, "frontend")

    signal.signal(signal.SIGINT, _shutdown)
    signal.signal(signal.SIGTERM, _shutdown)

    try:
        while True:
            backend_code = backend_proc.poll()
            frontend_code = frontend_proc.poll()

            if backend_code is not None:
                print(f"[runner] backend exited with code {backend_code}.", flush=True)
                _terminate(frontend_proc, "frontend")
                return backend_code

            if frontend_code is not None:
                print(f"[runner] frontend exited with code {frontend_code}.", flush=True)
                _terminate(backend_proc, "backend")
                return frontend_code

            # keep the loop responsive but light
            time.sleep(0.5)
    except KeyboardInterrupt:
        _shutdown()
        return 0


if __name__ == "__main__":
    sys.exit(main())
