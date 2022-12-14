import React, { useState } from "react";
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";
import "./style.css";
import Local from "../../Local";
import { useContext } from "react";
import { Context } from "../../App";

/**
 * @param {Object} opts
 * @param {boolean} opts.isActive
 * @param {React.Dispatch<React.SetStateAction<boolean>>} opts.changeActive
 * @param {React.Dispatch<React.SetStateAction<string>>} opts.setToken
 */
export default function Modal({ isActive, changeActive, setToken }) {
  const { api, setUser } = useContext(Context);

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  /** @type {React.MouseEventHandler<HTMLButtonElement>} */
  const handler = (e) => {
    e.preventDefault();
    api.logIn({ email: email, password: pwd }).then((data) => {
      if (data.token) {
        Local.setItem("shop-user", data.token);
        Local.setItem("user", data.data, true);
        setToken(data.token || "");
        setUser(data.data || "");
        changeActive(false);
      }
      setEmail("");
      setPwd("");
    });
  };

  return (
    <div className={isActive ? "popup-box active" : "popup-box"}>
      <div className="popup">
        <XCircle
          className="popup-close"
          onClick={(e) => {
            changeActive(false);
          }}
        />
        <Form>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Password</FormLabel>
            <FormControl
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </FormGroup>
          <Button variant="warning" type="submit" onClick={handler}>
            Войти
          </Button>
        </Form>
      </div>
    </div>
  );
};
