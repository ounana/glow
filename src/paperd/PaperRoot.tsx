import React, { useEffect, useRef } from 'react'
import { Row, Col, Radio } from 'antd'
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { PaperScope } from 'paper'

import Panel from './Panel';
import { Services, Service } from './services';
import { connect } from 'react-redux';

export class MyPaperScope extends PaperScope { }

export default connect()(() => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const paper = useRef<MyPaperScope>()
  const service = useRef<Service>()

  useEffect(() => {
    if (!canvas.current) return
    paper.current = new MyPaperScope()
    if (!paper.current) return
    paper.current.setup(canvas.current)
    ServiceReg('draw')

    const observable = fromEvent(window, 'resize').pipe(
      debounceTime(300),
      map(e => canvas.current!.parentElement!.getBoundingClientRect().width)
    )
    const subscription = observable.subscribe(w => {
      paper.current!.view.viewSize = new paper.current!.Size(w, 500)
    })
    return () => {
      subscription.unsubscribe()
    }
    //默认处于勾画工具
  }, [])

  //注册服务
  const ServiceReg = (value: string): void => {
    if (!paper.current) return
    //注销之前的
    if (service.current) {
      service.current.destroy()
      service.current = undefined
    }
    //获取
    const sc = Services.get(value)
    if (!sc) return
    //注册当前的
    service.current = new sc(paper.current)
  }

  return (
    <div>
      <Row>
        <Col span={18}>
          <canvas ref={canvas} style={{ border: '1px solid #ccc', width: '100%', height: 500 }}></canvas>
        </Col>
        <Col span={6}>
          <Panel />
        </Col>
      </Row>
      <Radio.Group defaultValue="draw" buttonStyle="solid" onChange={e => ServiceReg(e.target.value)}>
        <Radio.Button value="draw">勾画</Radio.Button>
        <Radio.Button value="move">移动</Radio.Button>
        <Radio.Button value="daub">涂抹</Radio.Button>
        <Radio.Button value="union">联合</Radio.Button>
        <Radio.Button value="hide">隐藏</Radio.Button>
        <Radio.Button value="show">显示</Radio.Button>
      </Radio.Group>
    </div>
  )
})