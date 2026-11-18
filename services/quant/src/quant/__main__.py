import os

import uvicorn


def main() -> None:
    raw_port = os.environ.get("PORT", "8000")
    port = int(raw_port)
    if not 1 <= port <= 65535:
        raise ValueError(f"PORT must be between 1 and 65535; received {raw_port!r}.")

    host = os.environ.get("HOST", "127.0.0.1")
    uvicorn.run("quant.api:app", host=host, port=port)


if __name__ == "__main__":
    main()
