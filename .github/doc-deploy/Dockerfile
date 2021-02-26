FROM node:10

# Copy file to docker container from Action warehouse
COPY entrypoint.sh /entrypoint.sh
# Provide Execution Authority
RUN chmod +x /entrypoint.sh

# Code file to execute when the container starts
ENTRYPOINT ["/entrypoint.sh"]