import React, { Component } from 'react';
import '../css/calendar.css'

class SelectBar extends React.Component {
    constructor (props) {
        super(props)
        const date = new Date();
        this.state = {
            is_month_list_show: 'none',
            full_year: date.getFullYear(),
            cur_month: date.getMonth() + 1,
            cur_date: date.getDate(),
            monthArr : [1,2,3,4,5,6,7,8,9,10,11,12]
        }
    }
    showMonthList () {
        this.state.is_month_list_show === 'none' ? this.setState({is_month_list_show: 'block'}) : this.setState({is_month_list_show: 'none'});
    }
    changeMonth (num) {
        this.setState({cur_month: num});
    }
    render() {
        const year_arr = [];
        for (let i = 1900; i <= 2050; i++) {
            year_arr.push(<li key={i}>{i}年</li>)
        }
      return (
        <div className="year_month_day">
            <div className="select_box">
                <div className="year_box">
                    <div className="year">{this.state.full_year}</div>
                    <div className="btn_year">
                        <span className="triangle"></span>
                    </div>
                    <ul className="year_list">
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
                                return  <li onClick={this.changeMonth.bind(this, item)} key={item}>{item}月</li>
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

export default class App extends React.Component {

    render() {
        return(
            <div className="cal_box">
                <div className="cal_wrap_left">
                    {/* <div className="select_box">2018年</div>
                    <a className="back_today">返回今天</a> */}
                    <SelectBar/>
                    <div></div>
                </div>
                <div className="cal_wrap_right"></div>
            </div>
        )
    }
}