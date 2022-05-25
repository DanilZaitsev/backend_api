#!/bin/sh
registration_url="https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPOSITORY}/actions/runners/registration-token"
echo "Requesting registration URL at '${registration_url}'"

payload=$(curl -sX POST -H "Authorization: token ${GITHUB_PAT}" ${registration_url})
export RUNNER_TOKEN=$(echo $payload | jq .token --raw-output)

./config.sh \
    --name $(hostname) \
    --token ${RUNNER_TOKEN} \
    --url https://github.com/${GITHUB_OWNER}/${GITHUB_REPOSITORY} \
    --work ${RUNNER_WORKDIR} \
    --unattended \
    --replace

remove() {
    ./config.sh remove --unattended --token "${RUNNER_TOKEN}"
}

trap 'remove; exit 130' INT
trap 'remove; exit 143' TERM

./run.sh "$*" &

wait $!

## Create a folder
#mkdir actions-runner && cd actions-runner# Download the latest runner package
#curl -o actions-runner-linux-x64-2.288.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.288.1/actions-runner-linux-x64-2.288.1.tar.gz
#echo "325b89bdc1c67264ec6f4515afda4534f14a6477d9ba241da19c43f9bed2f5a6  actions-runner-linux-x64-2.288.1.tar.gz" | shasum -a 256 -c
#tar xzf ./actions-runner-linux-x64-2.288.1.tar.gz
##./config.sh --url https://github.com/DanilZaitsev/backend_api --token AXZXP2I6NWJLQWQE43ZCDNLCGO4WI# Last step, run it!
#./config.sh \
#    --name $(hostname) \
#    --token AXZXP2PXKFG4BANWRNWW6V3CGTCKS \
#    --url https://github.com/DanilZaitsev/backend_api \
#    --work _work \
#    --unattended \
#    --replace
#
#remove() {
#    ./config.sh remove --unattended --token AXZXP2PXKFG4BANWRNWW6V3CGTCKS
#}
#trap 'remove; exit 130' INT
#trap 'remove; exit 143' TERM
#./run.sh "$*" &
#wait $!