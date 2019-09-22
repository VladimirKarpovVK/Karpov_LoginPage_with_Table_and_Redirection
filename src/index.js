import ReactDOM from "react-dom";
import React, { useState } from "react";
import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { grey } from "@material-ui/core/colors";

import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";


import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import styled from "styled-components";

import "./main.css";



import  ResultComponent from './Result';



const Affs = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const LoginPage = ({
  handleRedirection,
  FocusEmail,
  FocusPass,

  wrongpass,
  wrongEmail
}) => {
  const [checked, setCheck] = useState(false);

  let getEmail = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "";
  let getPass = localStorage.getItem("pass")
    ? localStorage.getItem("pass")
    : "";

  const [email, setEmail] = useState(getEmail);
  const [password, setPass] = useState(getPass);
  return (
    <form style={{ display: "flex", flexWrap: "wrap" }}>
      <TextField
        error={wrongEmail}
        onChange={e => {
          setEmail(e.target.value);
        }}
        onFocus={() => {
          FocusEmail();
        }}
        id="outlined-email-input"
        className="textField"
        label="Почта*"
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
        defaultValue={
          localStorage.getItem("email") ? localStorage.getItem("email") : ""
        }
      />
      <TextField
        onFocus={() => {
          return FocusPass();
        }}
        onChange={e => {
          setPass(e.target.value);
        }}
        defaultValue={
          localStorage.getItem("pass") ? localStorage.getItem("pass") : ""
        }
        error={wrongpass}
        FocusEmail
        id="outlined-password-input"
        className="textField"
        label="Пароль*"
        type="password"
        autoComplete="current-password"
        margin="normal"
        variant="outlined"
      />
      <ThemeProvider theme={checkboxtheme}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => {
                setCheck(!checked);
              }}
              value="checkedB"
              color="secondary"
            />
          }
          label="Запомнить меня"
        />
      </ThemeProvider>

      <Button
        onClick={() => {
          if (checked) {
            localStorage.setItem("pass", password);
            localStorage.setItem("email", email);
          }
          return handleRedirection(email, password);
        }}
        style={{ fontSize: "0.8em", paddingTop: "2%", paddingBottom: "2%" }}
        color="primary"
        className="button"
        variant="contained"
      >
        Войти в аккаунт
      </Button>
      <Affs>
        <Link component="button" color="primary" variant="body2">
          Забыли пароль?
        </Link>
        <Link component="button" color="primary" variant="body2">
          Ещё нет аккаунта? Регистрация
        </Link>
      </Affs>
    </form>
  );
};
const checkboxtheme = createMuiTheme({
  palette: {
    primary: { main: grey[500] }, //
    secondary: { main: grey[500] } //
  }
});

class App extends React.Component {
  // const [isLogged, setLogged] = useState(false);
  state = {
    isLogged: false,
    wrongPass: false,
    wrongEmail: false
  };
  FocusEmail = () => {
    this.setState({ wrongEmail: false });
  };
  FocusPassHandler = () => {
    this.setState({ wrongPass: false });
  };
  handleRedirection = (mail, password) => {
    if (password == "1234" && mail == "karpov@mail.ru") {
      this.setState({ isLogged: !this.state.isLogged });

      console.log(this.state.isLogged);
    } else if (password != "1234") {
      this.setState({ wrongPass: true });
    }

    if (mail !== "karpov@mail.ru") {
      this.setState({
        wrongEmail: true
      });
    }
  };

  render() {
    return (
      <Router>
        <Container maxWidth="sm">
          {this.state.isLogged && <Redirect to="/user" />}
          
          <Route
          
          path="/"
          exact={true}
          render={()=><Redirect
          to="/login"
          />}
          />
          <Route
            exact
            path="/login"
            render={() => {
              return (
                <LoginPage
                  FocusEmail={this.FocusEmail}
                  FocusPass={this.FocusPassHandler}
                  handleRedirection={this.handleRedirection}
                  wrongpass={this.state.wrongPass}
                  wrongEmail={this.state.wrongEmail}
                />
              );
            }}
          />
          <Route
            exact
            path="/user"
            render={() => {
              console.log(this.state.isLogged);
              return this.state.isLogged ? (
                <Container>
                  <Paper>
                    <ResultComponent/>
                  </Paper>
                </Container>
              ) : (
                <Redirect to="/login" exact />
              );
            }}
          />
        </Container>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
