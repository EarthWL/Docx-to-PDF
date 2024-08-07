# ---- Base Stage ----
    FROM ubuntu:20.04 AS base
    ENV DEBIAN_FRONTEND=noninteractive
    RUN apt update && \
        apt upgrade -y && \
        apt install -y software-properties-common && \
        add-apt-repository ppa:libreoffice/ppa && \
        apt update && \
        apt install -y libreoffice && \
        apt clean && \
        rm -rf /var/lib/apt/lists/* 
    
    # ---- Node Stage ----
    FROM base AS node
    RUN apt-get update && \
        apt-get install -y ca-certificates curl gnupg && \
        mkdir -p /etc/apt/keyrings && \
        curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
    
    ARG NODE_MAJOR=20
    RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
    
    RUN apt-get update && \
        apt-get install nodejs -y && \
        npm install -g yarn
    
    # ---- Unoserver Stage ----
    FROM node as node_n_python
    RUN apt-get update && \
        apt-get install -y python3 python3-pip && \
        pip3 install unoserver && \
        chmod +x /usr/local/lib/python3.8/dist-packages/unoserver/server.py
    
    # ---- Build Stage ----
    FROM node AS build
    RUN mkdir -p /tmp/generated_pdfs /tmp/uploaded_docx /tmp/libreoffice_profiles /docx-to-pdf/src/api/fonts
    
    WORKDIR /docx-to-pdf
    
    COPY ./package.json .
    COPY ./package-lock.json .
    RUN npm install && npm cache clean --force
    
    COPY ./src ./src
    
    # ---- Release Stage ----
    FROM node_n_python AS release
    COPY --from=build /tmp /tmp
    COPY --from=build /docx-to-pdf /docx-to-pdf
    ADD ./fonts /usr/share/fonts/custom
    
    WORKDIR /docx-to-pdf
    
    ARG PORT=8011
    ENV CLEANUP_AUTOMATION_DRY_MODE=OFF \
        CLEANUP_AUTOMATION_INTERVAL_MS=50000 \
        PORT=${PORT} \
        FILE_MAX_AGE_IN_SECONDS=300
    
    EXPOSE ${PORT}
    
    ENTRYPOINT ["npm", "start"]
    