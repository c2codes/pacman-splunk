source env.sh

docker run \
-e MONGO_SERVICE_HOST="${MONGO_SERVICE_HOST}" \
-e MONGO_AUTH_USER="${MONGO_AUTH_USER}" \
-e MONGO_AUTH_PWD="${MONGO_AUTH_PWD}" \
-e OTEL_SERVICE_NAME="${OTEL_SERVICE_NAME}" \
-e OTEL_RESOURCE_ATTRIBUTES="${OTEL_RESOURCE_ATTRIBUTES}" \
-e SPLUNK_RUM_REALM="${SPLUNK_RUM_REALM}" \
-e SPLUNK_RUM_ENVIRONMENT="${SPLUNK_RUM_ENVIRONMENT}" \
-e SPLUNK_RUM_TOKEN="${SPLUNK_RUM_TOKEN}" \
-p 8000:8080 cciobanu022/pacman