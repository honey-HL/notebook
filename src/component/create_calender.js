import React, { Component } from 'react';
import '../css/create_calendar.css'
import emitter from "../libs/ev"


export default class CreateCalendar extends React.Component {
    constructor (props) {
        super(props)
        const date = new Date();
        this.state = {
            full_year: date.getFullYear(),
            cur_month: date.getMonth() + 1,
            cur_date: date.getDate(),
            weeks : ['一', '二', '三', '四', '五', '六', '日']
        }
    }
     componentDidMount(){
        this.eventEmitter = emitter.addListener("getYear",(msg)=>{
            this.setState({
                full_year : msg
            })
        });
        this.eventEmitter = emitter.addListener("getMonth",(msg)=>{
            this.setState({
                cur_month : msg
            })
        });
    }
    createDates (cur_month, cur_year) {
        console.log(cur_month, cur_year)
        let dates_arr = []; // 日期渲染数组
        let total = [];
        let days = 1; // 当月有几天
        let next_days = 7 - total.length%7;
        console.log('next_days', next_days);
        console.log('next_days', next_days);
        let last_days = 1;
        let last_month_start = 1; // 从上个月第几号开始渲染
        let dayFirst = parseInt(new Date(cur_year, cur_month - 1, 1).getDay()) ? new Date(cur_year, cur_month - 1, 1).getDay() : 7; //当月第一天星期几
        console.log(dayFirst);

        // 算当月和下月多少天
        if (cur_month == 1 || cur_month ==3 || cur_month ==5 || cur_month ==7 || cur_month ==8 || cur_month ==10 || cur_month ==12) {
            days = 31;
            if (cur_month == 1 || cur_month ==8) {
                last_days = 31;
            } else if (cur_month ==3) {
                if (((cur_year % 4)==0) && ((cur_year % 100)!=0) || ((cur_year % 400)==0)) { // 闰年二月29天，平年2月28天
                    last_days = 29;
                } else {
                    last_days = 28;
                }
            } else if (cur_month ==5 || cur_month ==7 || cur_month ==10 || cur_month ==12) {
                last_days = 30;
            }
        } else if (cur_month == 4 || cur_month ==6 || cur_month ==9 || cur_month ==11) {
            days = 30;last_days = 31;
        } else if (cur_month == 2) {
            if (((cur_year % 4)==0) && ((cur_year % 100)!=0) || ((cur_year % 400)==0)) { // 闰年二月29天，平年2月28天
                days = 29;last_days = 31;
            } else {
                days = 28;last_days = 31;
            }
        }

        // 格式化数据
        if (dayFirst !== 1) { // 当月第一天不是星期一
            last_month_start = last_days + 2 - dayFirst;
            console.log('last_month_start', last_month_start);
            for (let i = last_month_start; i <= last_days; i++) { // 上个月数据
                total.push({date: i, gray: true});
            }
        }
        for (let j = 1; j <= days; j++) { // 当月数据
            total.push({date: j, gray: false});
        }
        for (let n = 1; n < next_days; n++) { // 下月数据
            total.push({date: n, gray: true});
        }
        let currData = [];
        let allData = [];
        for (let m = 0; m < total.length; m++) {
            currData.push(total[m]);
            if((m != 0 && (m + 1) % 7 === 0) || m === total.length - 1) {
                if (currData.length === 7) {
                    allData.push(currData);
                }
                currData = [];
            }
        }

        // 渲染table
        console.log(total);
        console.log(allData);
        let td_height = (310 - 34)/allData.length - 7;
        for (let i in allData) {
            console.log(allData[i]);
            dates_arr.push(<tr className="tr" key={'line' + i}>{
                allData[i].map((item, index) => {
                    return  <td
                    style={{"height": (310 - 34)/allData.length + 'px', "color": item.gray ? "#bfbfbf":""}}
                    className={`cur_days td ${this.getActive(item)? "active" : ""} 
                    `} 
                    key={'line' + i + '_no' + index}
                    >
                        <a className={`${this.state.cur_date===item.date&&!item.gray ? 'same_date': ''}`}
                            style={{"height": td_height + 'px', 'lineHeight': td_height + 'px'}}>
                            {item.date}
                        </a>
                    </td>
                })
            }</tr>)
        }
        return dates_arr;
    }

    // 获取active样式
    getActive (item) {
        console.log('this.state.cur_month', this.state.cur_month);
        console.log('new Date().getMonth() + 1',Number(new Date().getMonth() + 1));
        if (this.state.cur_month===(new Date().getMonth() + 1)
        &&this.state.full_year===new Date().getFullYear()
        &&this.state.cur_date===item.date&&!item.gray) {
            return true
        }
    }
    render () {
        console.log(this.state.cur_month, this.state.full_year);
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
                    {this.createDates(this.state.cur_month, this.state.full_year)}
                </tbody>
            </table>
        );
    }
}