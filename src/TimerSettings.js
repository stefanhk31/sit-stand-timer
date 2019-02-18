import React, { Component } from 'react';


class TimerSettings extends Component { 
    constructor(props) {
        super(props)

        this.handleSitClick = this.handleSitClick.bind(this);
        this.handleStandClick = this.handleStandClick.bind(this);
    }

    //increment/decrement Sit and Stand times when user clicks + and - buttons
    handleSitClick(e) {
        const newSitTime = this.props.SitTime;

        switch (e.target.id) {
            case "Sit-increment":
                newSitTime.add(1, 'minutes');
                break;
            case "Sit-decrement":
                newSitTime.subtract(1, 'minutes');
                break;
            default:
                break;
        }


        if (this.props.SitTime.get('minutes') < 0) {
            this.props.SitTime.add(1, 'minutes')
        }


        this.props.changeSitTime(newSitTime);       
    }

    handleStandClick(e) {
        const newStandTime = this.props.StandTime;

        switch (e.target.id) {
            case "Stand-increment":
                newStandTime.add(1, 'minutes');
                break;
            case "Stand-decrement":
                newStandTime.subtract(1, 'minutes');
                break;
            default:
                break;
        }

        if (this.props.StandTime.get('minutes') < 0) {
            this.props.StandTime.add(1, 'minutes')
        }

        this.props.changeStandTime(newStandTime);

    }

    render() {
        
        return (
            <div className="text-center timer-settings">
                <div className="row settings-row">
                    <div className="col-xs-1 btn btn-primary inc-dec" id="Sit-increment" onClick={this.handleSitClick}>+</div> 
                    <div className="col-xs-1 settings-label">Sit:&nbsp;{this.props.SitTime.get('minutes')}:00&nbsp;</div>
                    <div className="col-xs-1 btn btn-primary inc-dec" id="Sit-decrement" onClick={this.handleSitClick}>-</div> 
                </div>
                <div className="row settings-row">
                    <div className="col-xs-1 btn btn-primary inc-dec" id="Stand-increment" onClick={this.handleStandClick}>+</div>
                    <div className="col-xs-1 settings-label">Stand:&nbsp;{this.props.StandTime.get('minutes')}:00&nbsp;</div>
                    <div className="col-xs-1 btn btn-primary inc-dec" id="Stand-decrement" onClick={this.handleStandClick}>-</div> 
                </div>
                <div className="row settings-row">
                    <div className="col-xl-12 font-weight-bold" id="timer-label">{this.props.label}</div>
                </div>
            </div>
        )   

    }
}


export default TimerSettings;