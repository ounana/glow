#!/bin/sh -l

set -e

if [ -z "$GITHUB_TOKEN" ]
then
  echo "You must provide the action with a GitHub Personal Access Token secret in order to deploy."
  exit 1
fi

if [ -z "$BRANCH" ]
then
  echo "You must provide the action with a branch name it should deploy to, for example gh-pages or docs."
  exit 1
fi

if [ -z "$FOLDER" ]
then
  echo "You must provide the action with the folder name in the repository where your compiled page lives."
  exit 1
fi

case "$FOLDER" in /*|./*)
  echo "The deployment folder cannot be prefixed with '/' or './'. Instead reference the folder name directly."
  exit 1
esac

# actions/checkout@v2 会将代码检出到$GITHUB_WORKSPACE目录下
cd $GITHUB_WORKSPACE && \

# configure git
git config --global user.email 771565119@qq.com && \
git config --global user.name ounana && \

# configure github path
REPOSITORY_PATH="https://${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" && \

# Check whether the remote branch exists
# wc -l 统计输出行数 -eq 对比
if [ "$(git ls-remote --heads "$REPOSITORY_PATH" "$BRANCH" | wc -l)" -eq 0 ];
then
  echo "Creating remote branch ${BRANCH} as it doesn't exist..."
  git checkout main && \
  git checkout --orphan $BRANCH && \
  git rm -rf . && \
  touch README.md && \
  git add README.md && \
  git commit -m "Initial ${BRANCH} commit" && \
  git push $REPOSITORY_PATH $BRANCH
  # 上一条命令的执行失败则退出
  if [ $? -ne 0 ];
  then
    echo "create remote branch failed..."
    exit 1
  fi
fi

# Checkout in main brach
git checkout main && \

# Run build scripts
echo "Running build scripts... $BUILD_SCRIPT" && \
eval "$BUILD_SCRIPT" && \

# Commits the data to Github.
echo "Deploying to GitHub..." && \
git add -f $FOLDER && \
git commit -m "Deploying to ${BRANCH} from main:build ${GITHUB_SHA}" --quiet && \

# get build folder hash code
FOLDER_SHA=`git subtree split --prefix $FOLDER main` && \

# commits to github:brach
git push $REPOSITORY_PATH $FOLDER_SHA:$BRANCH --force && \

echo "Deployment succesful!"