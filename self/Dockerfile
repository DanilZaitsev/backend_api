FROM debian:buster-slim

ARG GITHUB_RUNNER_VERSION="2.291.1"

ENV RUNNER_NAME "runner"
ENV GITHUB_PAT ""
ENV GITHUB_OWNER ""
ENV GITHUB_REPOSITORY ""
ENV RUNNER_WORKDIR "_work"
ENV RUNNER_LABELS ""
#ENV DOCKER_HOST="tcp://docker-in-docker.dind:2376"

RUN apt-get update \
    && apt-get install -y \
        curl \
        sudo \
        git \
        jq \
        iputils-ping \
        unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && useradd -m github \
    && usermod -aG sudo github \
    && echo "%sudo ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers \
    && curl https://download.docker.com/linux/static/stable/x86_64/docker-19.03.9.tgz --output docker-19.03.9.tgz \
    && tar xvfz docker-19.03.9.tgz \
    && cp docker/* /usr/bin/

RUN curl -LO "https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl" \
    && chmod +x ./kubectl \
    && mv ./kubectl /usr/local/bin/kubectl \
    && curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 \
    && chmod +x get_helm.sh && ./get_helm.sh

USER github
WORKDIR /home/github

RUN curl -Ls https://github.com/actions/runner/releases/download/v${GITHUB_RUNNER_VERSION}/actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz | tar xz \
    && sudo ./bin/installdependencies.sh

COPY --chown=github:github entrypoint.sh ./entrypoint.sh
RUN sudo chmod u+x ./entrypoint.sh

ENTRYPOINT ["/home/github/entrypoint.sh"]
# docker build -t harbor.tsl.telus.com/oe-b2b-evs/ivs-runner:1.0.0-12 -f Dockerfile .
# docker push harbor.tsl.telus.com/oe-b2b-evs/ivs-runner:1.0.0-12
