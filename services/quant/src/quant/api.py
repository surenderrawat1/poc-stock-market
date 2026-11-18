from fastapi import FastAPI

from quant.health import health_status

app = FastAPI(
    title="Stock Market Quant Service",
    version="0.1.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)


@app.get("/health")
def get_health() -> dict[str, str]:
    return health_status()
