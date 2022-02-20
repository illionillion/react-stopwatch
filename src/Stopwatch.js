import React , {Component} from "react";
// import  ReactDOM  from "react-dom";

// Stopwatchコンポーネントを定義
class Stopwatch extends Component {
    constructor (props) {
        super (props)
        this.state = { //初期値を設定
            isLive : false,
            curTime : 0,
            startTime : 0
        }
        this.timerId = 0
    }
    
    // マウントしたとき
    componentWillMount () {
        this.timerId = setInterval((e) => {
            this.tick()
        }, 1000);
    }

    // アンマウントしたとき
    componentWillUnmount () {
        clearInterval (this.timerId)
    }

    // 毎秒実行
    tick(){
        if (this.state.isLive) {
            const v = new Date().getTime()
            this.setState({curTime:v})
        }
    }

    // 開始ボタンが押されたとき
    clickHandler (e) {
        // 停止する時
        if (this.state.isLive) {
            this.setState({isLive:false})
            return
        }

        // 開始する時
        const v = new Date().getTime()
        this.setState({
            curTime : v,
            startTime : v,
            isLive : true
        })

    }

    // 時刻表示ディスプレイ
    getDisp () {
        const s = this.state
        const delta = s.curTime - s.startTime
        const t = Math.floor(delta/1000)
        const ss = t % 60
        const m = Math.floor(t/60)
        const mm = m % 60
        const hh = Math.floor(mm/60)

        const z = (num) => {
            const s = '00' + String(num)
            return s.substr(s.length-2,2)
        }

        return (<span className="disp">
            {z(hh)}：{z(mm)}：{z(ss)}
        </span>)
    }

    // 描画
    render () {
        let label = 'START'
        if (this.state.isLive) {
            label = 'STOP'
        }

        const disp = this.getDisp()
        const fclik = (e) => this.clickHandler(e)
        return (<div className="Stopwatch">
            <div>{disp}</div>
            <button onClick={fclik}>{label}</button>
        </div>)
    }
}

export default Stopwatch