import React, { Component } from "react";
import DatePicker from "react-native-datepicker";

class DatePickerSpin extends Component {
  constructor(props) {
    super(props);
    this.state = { date: "" };
  }

  _setDateState(date) {
    this.setState({ date: date });
  }

  _handleChange(date) {
    this.props.action(date);
  }

  render() {
    return (
      <DatePicker
        style={{
          width: "90%",
          borderRadius: 6,
          shadowColor: "rgba(0, 0, 0, 0.17)",
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 1,
          elevation: 1,
          marginTop: "5%",
          padding: 10,
          backgroundColor: "#FFFFFF",
          margin: "5%",
          alignSelf: "flex-start"
        }}
        date={this.state.date}
        mode="date"
        androidMode="spinner"
        placeholder=" "
        format="YYYY-MM-DD"
        minDate="1920-01-01"
        maxDate="2010-01-01"
        confirmBtnText="Listo"
        cancelBtnText="Cancelar"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            borderColor: "#FFFFFF",
            fontSize: 20
          }
        }}
        onDateChange={date => {
          this._setDateState(date), this._handleChange(date);
        }}
      />
    );
  }
}

export default DatePickerSpin;
