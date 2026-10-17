#!/usr/bin/env bash
set -Eeuo pipefail
umask 077

for name in FTP_HOST FTP_USERNAME FTP_PASSWORD FTP_REMOTE_DIR; do
  if [[ -z "${!name:-}" ]]; then
    printf 'Missing required deployment setting: %s\n' "$name" >&2
    exit 2
  fi
done

if [[ ! "$FTP_HOST" =~ ^[A-Za-z0-9.-]+$ ]]; then
  printf 'FTP_HOST must contain only a hostname or IPv4 address, without a scheme or path.\n' >&2
  exit 2
fi

FTP_PORT="${FTP_PORT:-21}"
if [[ ! "$FTP_PORT" =~ ^[0-9]+$ ]] || (( FTP_PORT < 1 || FTP_PORT > 65535 )); then
  printf 'FTP_PORT must be an integer from 1 through 65535.\n' >&2
  exit 2
fi

if [[ "$FTP_USERNAME" == *:* ]]; then
  printf 'FTP_USERNAME cannot contain a colon.\n' >&2
  exit 2
fi

remote_dir="${FTP_REMOTE_DIR%/}"
if [[ "$FTP_REMOTE_DIR" != /* || "$FTP_REMOTE_DIR" =~ // || ! "$remote_dir" =~ ^(/[A-Za-z0-9._~-]+)*$ ]]; then
  printf 'FTP_REMOTE_DIR must be an absolute FTP path containing only letters, numbers, slash, dot, underscore, tilde, and hyphen.\n' >&2
  exit 2
fi

if [[ "$remote_dir" =~ (^|/)\.\.?(/|$) ]]; then
  printf 'FTP_REMOTE_DIR cannot contain dot or dot-dot path segments.\n' >&2
  exit 2
fi

for asset in css/style.css js/code.js; do
  if [[ ! -f "$asset" ]]; then
    printf 'Required asset is missing: %s\n' "$asset" >&2
    exit 2
  fi
done

auth_config="$(mktemp)"
trap 'rm -f -- "$auth_config"' EXIT
chmod 600 "$auth_config"

escape_curl_config_value() {
  local value="$1"
  value="${value//\\/\\\\}"
  value="${value//\"/\\\"}"
  value="${value//$'\t'/\\t}"
  value="${value//$'\n'/\\n}"
  value="${value//$'\r'/\\r}"
  value="${value//$'\v'/\\v}"
  printf '%s' "$value"
}

{
  printf 'user = "'
  escape_curl_config_value "${FTP_USERNAME}:${FTP_PASSWORD}"
  printf '"\n'
} > "$auth_config"
unset FTP_USERNAME FTP_PASSWORD

for asset in css/style.css js/code.js; do
  filename="${asset##*/}"
  destination="${remote_dir}/${filename}"
  remote_url="ftp://${FTP_HOST}:${FTP_PORT}${destination}"

  curl --disable \
    --config "$auth_config" \
    --fail \
    --silent \
    --show-error \
    --ftp-pasv \
    --ssl-reqd \
    --upload-file "$asset" \
    "$remote_url"

  printf 'Uploaded %s over explicit FTPS.\n' "$asset"
done
