FROM debian:buster-slim

ARG GITHUB_RUNNER_VERSION="2.292.0"

ENV RUNNER_NAME "runner"
ENV GITHUB_PAT ""
ENV GITHUB_OWNER ""
ENV GITHUB_REPOSITORY ""
ENV RUNNER_WORKDIR "_work"
ENV RUNNER_LABELS ""
ENV DOCKER_HOST="tcp://docker-in-docker.dind:2376"

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

#RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
#RUN unzip awscliv2.zip
#RUN ./aws/install

USER github
WORKDIR /home/github

RUN curl -Ls https://github.com/actions/runner/releases/download/v${GITHUB_RUNNER_VERSION}/actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz | tar xz \
    && sudo ./bin/installdependencies.sh

COPY --chown=github:github entrypoint.sh ./entrypoint.sh
RUN sudo chmod u+x ./entrypoint.sh

ENTRYPOINT ["/home/github/entrypoint.sh"]




#FROM debian:buster-slim
#
#ARG GITHUB_RUNNER_VERSION="2.165.2"
#
#ENV RUNNER_NAME "runner"
#ENV GITHUB_PAT ""
#ENV GITHUB_OWNER ""
#ENV GITHUB_REPOSITORY ""
#ENV RUNNER_WORKDIR "_work"
#
#RUN apt-get update \
#    && apt-get install -y \
#        curl \
#        sudo \
#        git \
#        jq \
#    && apt-get clean \
#    && rm -rf /var/lib/apt/lists/* \
#    && useradd -m github \
#    && usermod -aG sudo github \
#    && echo "%sudo ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers
#
#USER github
#WORKDIR /home/github
#
#RUN curl -Ls https://github.com/actions/runner/releases/download/v${GITHUB_RUNNER_VERSION}/actions-runner-linux-x64-${GITHUB_RUNNER_VERSION}.tar.gz | tar xz \
#    && sudo ./bin/installdependencies.sh
#
#COPY --chown=github:github entrypoint.sh ./entrypoint.sh
#RUN sudo chmod u+x ./entrypoint.sh
#
#ENTRYPOINT ["/home/github/entrypoint.sh"]