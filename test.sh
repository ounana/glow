#!/bin/sh -l

echo "dwq"
BRANCH="gh-pagess"

LINES=`git ls-remote --heads origin $BRANCH | wc -l`

if [ $LINES -eq 0 ];
then
  echo "远程分支不存在";
  git checkout main  && \
  git checkout --orphan $BRANCH

  # git rm -rf . && \
  # touch README.md && \
  # git add README.md && \
  # git commit -m "Initial ${BRANCH} commit" && \
  # git push $REPOSITORY_PATH $BRANCH
  # # 上一条命令的执行失败则退出
  # if [ $? -ne 0 ];
  # then
  #   echo "create remote branch failed..."
  #   exit 1
  # fi
fi



function pause(){
  read -n 1 -p "$*" INP
  if [ $INP != '' ] ; then
    echo -ne '\b \n'
  fi
}

pause "end"