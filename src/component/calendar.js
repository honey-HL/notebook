import React, { Component } from 'react';
import '../css/calendar.css'
import emitter from "../libs/ev"

class SelectBar extends React.Component {
    constructor (props) {
        super(props)
        const date = new Date();
        this.state = {
            is_month_list_show: 'none',
            is_year_list_show: 'none',
            full_year: date.getFullYear(),
            cur_month: date.getMonth() + 1,
            cur_date: date.getDate(),
            monthArr : [1,2,3,4,5,6,7,8,9,10,11,12]
        }
    }
    componentDidMount() {
        window.addEventListener('click', () => {
            if (this.state.is_month_list_show === 'block') {
                this.setState({is_month_list_show: 'none'})
            }
            if (this.state.is_year_list_show === 'block') {
                this.setState({is_year_list_show: 'none'})
            }
        })
    }
    showMonthList (e) {
        e.stopPropagation();
        this.state.is_month_list_show === 'none' ? this.setState({is_month_list_show: 'block'}) : this.setState({is_month_list_show: 'none'});
        if (this.state.is_year_list_show === 'block') {
            this.setState({is_year_list_show: 'none'})
        }
    }
    showYearList (e) {
        e.stopPropagation();
        this.state.is_year_list_show === 'none' ? this.setState({is_year_list_show: 'block'}) : this.setState({is_year_list_show: 'none'});
        if (this.state.is_month_list_show === 'block') {
            this.setState({is_month_list_show: 'none'})
        }
    }
    changeMonth (month) {
        this.setState({cur_month: month});
        this.setState({is_month_list_show: 'none'});
    }
    changeYear (year) {
        // emitter.emit("callMe","Hello");
        this.setState({full_year: year});
        this.setState({is_year_list_show: 'none'});
    }
    yearScroll () {
        let clientHeight = this.yearBox.clientHeight; //可视区域高度
        // let scrollTop  = this.yearBox.scrollTop;  //滚动条滚动高度
        // this.yearBox.scrollTo(0, (this.state.full_year - 1900)*26);
        // this.yearBox.attributes('style', 'top:' + (this.state.full_year - 1900)*26 + 'px');
        // console.log(scrollTop);
        // let scrollHeight = this.refs.yearBox.scrollHeight; //滚动内容高度
    }
    render() {
        const year_arr = [];
        for (let i = 1900; i <= 2050; i++) {
            year_arr.push(<li className={i == this.state.full_year ? 'cur_year':null} onClick={this.changeYear.bind(this, i)} key={i}>{i}年</li>)
        }
      return (
        <div className="year_month_day">
            <div className="select_box">
                <div onClick={this.showYearList.bind(this)} className="year_box">
                    <div className="year">{this.state.full_year}</div>
                    <div className="btn_year">
                        <span className="triangle"></span>
                    </div>
                    <ul onScrollCapture={() => this.yearScroll()} ref={c => {this.yearBox = c;}} style={{'display': this.state.is_year_list_show}} className="year_list">
                        {year_arr}
                    </ul>
                </div>
                <div className="month_box">
                    <a className="left_btn">{`<`}</a>
                    <a className="right_btn">{`>`}</a>
                    <div onClick={this.showMonthList.bind(this)} className="month">{this.state.cur_month}月
                        <span className="triangle"></span>
                    </div>
                    <ul style={{'display': this.state.is_month_list_show}} className="month_list">
                        {
                            this.state.monthArr.map((item,index) => {
                                return  <li className={item == this.state.cur_month ? 'cur_month':null} onClick={this.changeMonth.bind(this, item)} key={item}>{item}月</li>
                            })
                        }
                    </ul>
                </div>
                <div className="holiday_box">
                    <div className="year">假期安排</div>
                    <div className="btn_year">
                        <span className="triangle"></span>
                    </div>
                </div>
            </div>
            <a className="back_today">返回今天</a>
        </div>
      );
    }
}

class Calendar extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            weeks : ['一', '二', '三', '四', '五', '六', '日']
        }
    }
    render () {
        return (
            <table className="calender_table">
                <tbody>
                    <tr>
                        {
                            this.state.weeks.map((item, index) => {
                                return <th className={(index== 5 || index== 6) ? "weekend" :null} key={item}>{item}</th>
                            })
                        }
                    </tr>
                </tbody>
            </table>
        );
    }
}

class RightContent extends React.Component {
    constructor (props) {
        super(props)
        const date = new Date();
        const weeks_arr = ['日', '一', '二', '三', '四', '五', '六']
        this.state = {
            date: date.getDate(),
            today: date.getFullYear() + '-' + Number(date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + date.getMonth() + 1) + '-' + (date.getDate() >=10 ? date.getDate() : '0' + date.getDate()),
            weeks: weeks_arr[date.getDay()]
        }
    }
    // componentDidMount(){
    //     console.log(this.eventEmitter);
    //     console.log(emitter);
    //     this.eventEmitter = emitter.addListener("callMe",(msg)=>{
    //         debugger
    //         this.setState({
    //             time : msg
    //         })
    //     });
    //     console.log(this.state.time);
    // }
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }
    render () {
        return(
            <div className="right_content">
                <p className="dates">{this.state.today} 星期{this.state.weeks}</p>
                <p className="ji_hao">{this.state.date}</p>
            </div>
        )
    }
}

export default class App extends React.Component {
    render() {
        return(
            <div className="cal_box">
                <div className="cal_wrap_left">
                    {/* <div className="select_box">2018年</div>
                    <a className="back_today">返回今天</a> */}
                    <SelectBar/>
                    <div className="calendar">
                        <Calendar/>
                    </div>
                </div>
                <div className="cal_wrap_right">
                    <RightContent/>
                </div>
            </div>
        )
    }
}