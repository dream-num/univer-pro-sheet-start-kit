CR = univer-acr-registry.cn-shenzhen.cr.aliyuncs.com
LOCAL_TAG = dev
PUSH_TAG ?= latest
PUSH_TAG_AS_LATEST ?= true
REPOSITORY_LITE = univer-collaboration-lite
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

.PHONY: build_image_lite
# docker buildx build image for demo
build_image_lite: create_builder
	$(CTR) buildx build \
		--builder $(BUILDER) \
		--platform linux/$(shell docker version -f '{{.Server.Arch}}') \
		--file Dockerfile \
		-t $(REPOSITORY_LITE):$(LOCAL_TAG) \
		--load .

.PHONY: push_image_lite
# Build and Push multi-platform Docker images for lite
push_image_lite: create_builder
ifeq ($(PUSH_TAG), latest)
	$(eval image_tag=-t $(CR)/$(NS)/$(REPOSITORY_LITE):latest)
else ifeq ($(PUSH_TAG_AS_LATEST), true)
	$(eval image_tag=-t $(CR)/$(NS)/$(REPOSITORY_LITE):$(PUSH_TAG) -t $(CR)/$(NS)/$(REPOSITORY_LITE):latest)
else
	$(eval image_tag=-t $(CR)/$(NS)/$(REPOSITORY_LITE):$(PUSH_TAG))
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
