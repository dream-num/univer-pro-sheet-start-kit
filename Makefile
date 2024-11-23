CR = univer-acr-registry.cn-shenzhen.cr.aliyuncs.com
LOCAL_TAG = dev
PUSH_TAG ?= latest
PUSH_TAG_AS_LATEST ?= true
REPOSITORY = univer-collaboration-lite
NS ?= release
CTR = docker
BUILDER ?= univerdemo-builder
PROXY ?= 

OSARCH ?= linux/amd64,linux/arm64

.PHONY: create_builder
# Check if the builder exists and create it if not
create_builder:
	@if ! $(CTR) buildx inspect $(BUILDER) > /dev/null 2>&1; then \
		$(CTR) buildx create --name $(BUILDER) --use; \
	fi

.PHONY: build_image
# docker buildx build image for demo
build_image: create_builder
	$(CTR) buildx build \
		--builder $(BUILDER) \
		--platform linux/$(shell docker version -f '{{.Server.Arch}}') \
		--file Dockerfile \
		-t $(REPOSITORY):$(LOCAL_TAG) \
		--load .

.PHONY: push_image
# Build and Push multi-platform Docker images
push_image: create_builder
ifeq ($(PUSH_TAG), latest)
	$(eval image_tag=-t $(CR)/$(NS)/$(REPOSITORY):latest)
else ifeq ($(PUSH_TAG_AS_LATEST), true)
	$(eval image_tag=-t $(CR)/$(NS)/$(REPOSITORY):$(PUSH_TAG) -t $(CR)/$(NS)/$(REPOSITORY):latest)
else
	$(eval image_tag=-t $(CR)/$(NS)/$(REPOSITORY):$(PUSH_TAG))
endif
	$(CTR) buildx build \
	--builder $(BUILDER) \
	--platform $(OSARCH) \
	--file Dockerfile \
	$(image_tag) \
	--push .

.PHONY: clean_builder
# Clean up the builder instance
clean_builder:
	@docker buildx rm $(BUILDER)

.PHONY: test_image_run
test_image_run: create_builder 
	$(eval image_tag=-t $(REPOSITORY):$(LOCAL_TAG))
	$(CTR) run --rm -it --network univer-prod -p 3010:3010 $(image_tag)
