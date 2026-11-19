FROM python:3.12-slim

WORKDIR /service

COPY services/quant/pyproject.toml ./pyproject.toml
COPY services/quant/src ./src
RUN python -m pip install --no-cache-dir .

ENV HOST=0.0.0.0
ENV PORT=8000

CMD ["python", "-m", "quant"]
