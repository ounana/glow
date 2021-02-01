import { Button } from "antd"
import { PureComponent } from "react"

export default class IndexDb extends PureComponent {
  db: IDBDatabase | null = null

  onREADData = () => {
    if (!this.db) return
    let transaction = this.db.transaction(['person'], 'readonly')
    let objectStore = transaction.objectStore('person')
    // let request=objectStore.get(1)//通过主键读取数据
    let request = objectStore.index('name').get('Tom')//通过索引读取数据
    request.addEventListener('error', (e) => {
      console.log('读取失败')
    })
    request.addEventListener('success', (e: any) => {
      console.log(e.target.result)
    })
  }

  onOpenDb = () => {
    //打开数据库，如果没有则创建
    let request = window.indexedDB.open('myDB', 1)
    //捕捉错误
    request.addEventListener('error', function (e) {
      console.log('数据库打开失败')
      console.log(e)
    })

    request.addEventListener('success', evt => {
      console.log('打开数据库成功')
      //得到数据库数据
      this.db = request.result

      // this.add()
      // this.read()
      // updata()
      // remove()
      // readAll()
      // deleteDB('myDB')

      // close(db)
    })

    request.addEventListener('upgradeneeded', (e: any) => {
      console.log('数据库创建/升级成功')
      this.db = e.target.result as IDBDatabase
      //判断表是否存在
      if (!this.db.objectStoreNames.contains('person')) {
        //建表，定义主键，自增
        const objectStore = this.db.createObjectStore('person', {
          keyPath: 'id', autoIncrement: true
        })
        //创建索引名称，配置属性
        objectStore.createIndex('name', 'name', { unique: true })//不能重复
        objectStore.createIndex('email', 'email')
      }
    })
  }

  onAddData = () => {
    if (!this.db) return
    let request = this.db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .add({ name: 'Tom', email: 'Tom@qq.com' })
    //写入数据是异步操作，所以需要监听是否成功
    request.addEventListener('success', function (e) {
      console.log('数据写入成功')
    })
    request.addEventListener('error', function (e) {
      console.log('数据写入失败')
    })
  }

  onReadAll = () => {
    if (!this.db) return
    let objectStore = this.db.transaction(['person']).objectStore('person')
    objectStore.openCursor().addEventListener('success', (e: any) => {
      let cursor = e.target.result
      if (cursor) {
        console.log(cursor.value)
        cursor.continue()
      } else {
        console.log('没有数据了')
      }
    })
  }

  onUpdata = () => {
    if (!this.db) return
    let request = this.db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .put({ id: 2, name: 'Tom', email: 'Toms@qq.com' })
    request.addEventListener('success', function (e) {
      console.log('数据更新成功')
    })
    request.addEventListener('error', function (e) {
      console.log('数据更新失败')
    })
  }
  remove = () => {
    if (!this.db) return
    let request = this.db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .delete(4)
    request.addEventListener('success', function (e) {
      console.log('数据删除成功')
    })
  }
  close = () => {
    this.db?.close()
  }
  deleteDb = () => {
    window.indexedDB.deleteDatabase('myDB')
  }
  render() {
    return (
      <div>
        <h1>Index Db</h1>
        <Button onClick={this.onOpenDb}>OPEN DB</Button>
        <Button onClick={this.onAddData}>ADD DATA</Button>
        <Button onClick={this.onREADData}>READ DATA</Button>
        <Button onClick={this.onReadAll}>READ ALL</Button>
        <Button onClick={this.onUpdata}>UPDATA</Button>
      </div>
    )
  }
}