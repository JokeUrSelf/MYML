WORKING_DIR = $(shell pwd)


DOCKER_IMAGE_NAME = myml
DOCKER_CONTAINER_NAME = myml

run: init start

init: dockerignore build

dockerignore:
	@touch -a .gitignore .dockerignore.edit
	@echo "# This file is generated automatically, combining '.gitignore' and '.dockerignore.edit'" > .dockerignore
	@echo "# If you want to modify the file, do that in '.dockerignore.edit' than run 'make dockerignore'\n" >> .dockerignore
	@cat  .gitignore .dockerignore.edit >> .dockerignore 

build: stop kill
	@docker build -t ${DOCKER_IMAGE_NAME} ${WORKING_DIR}

start:
	@docker run --rm --name ${DOCKER_CONTAINER_NAME} -v ${WORKING_DIR}:/app -w /app ${DOCKER_IMAGE_NAME}

uninstall: kill
	@docker rmi ${DOCKER_IMAGE_NAME} || true

kill: stop
	@docker rm ${DOCKER_CONTAINER_NAME} > /dev/null 2>&1 || true

stop:
	@docker stop ${DOCKER_CONTAINER_NAME} > /dev/null 2>&1 || true

shell: 
	@docker exec -it ${DOCKER_CONTAINER_NAME} /bin/bash

test:
	@docker run --rm --name ${DOCKER_CONTAINER_NAME} -v ${WORKING_DIR}:/app -w /app ${DOCKER_IMAGE_NAME} deno test --allow-read --allow-net


.PHONY: init build uninstall kill start stop shell test
