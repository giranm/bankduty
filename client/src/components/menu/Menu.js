import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Menu,
  Image,
  Dropdown,
  Container,
  Button,
  Label,
  Icon,
} from "semantic-ui-react";

import logo from "./logo.png";

const LinkStyle = {
  color: "inherit",
};

const TopBarMenu = () => {
  // Attach TradingView Ticker Tape
  useEffect(() => {
    insertTickerTape();
  });

  return (
    <Menu fixed="top" size="large" inverted>
      <Container>
        {/* Logo */}
        <Menu.Item as="a" header>
          <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
          BankDuty
        </Menu.Item>

        {/* Home */}
        <Menu.Item as="a">
          <Link style={LinkStyle} to="/">
            Home
          </Link>
        </Menu.Item>

        {/* Personal */}
        <Dropdown item simple text="Personal">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Link style={LinkStyle} to="/payments">
                Payments
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link style={LinkStyle} to="/credit">
                Credit
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link style={LinkStyle} to="/loans">
                Loans
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link style={LinkStyle} to="/pensions">
                Pensions
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link style={LinkStyle} to="/car-insurance">
                Car Insurance
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Business */}
        <Dropdown item simple text="Business">
          <Dropdown.Menu>
            <Dropdown.Header>Corporate</Dropdown.Header>
            <Dropdown.Item>
              <Link style={LinkStyle} to="/cash-management">
                Cash Management
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link style={LinkStyle} to="/financing">
                Financing
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Advanced </Dropdown.Header>
            <Dropdown.Item>
              <Link style={LinkStyle} to="/portfolio">
                Portfolio
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link style={LinkStyle} to="/trading">
                Trading
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link style={LinkStyle} to="/analytics">
                Analytics
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Ticker and Profile */}
        <Menu.Menu position="right">
          <Menu.Item fitted>
            <div id="ticker-tape" style={{ width: "530px" }} />
          </Menu.Item>
          <Menu.Item>
            <Button as="div" labelPosition="left">
              <Label color="violet" inverted>
                giranm
              </Label>
              <Button icon color="violet">
                <Icon name="user circle" size="large" />
              </Button>
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

// TradingView Ticker Tape Embedding Logic
const insertTickerTape = () => {
  if (document.getElementById("ticker-tape")) {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "OANDA:SPX500USD",
          title: "S&P 500",
        },
        {
          proName: "OANDA:NAS100USD",
          title: "Nasdaq 100",
        },
        {
          proName: "FX_IDC:EURUSD",
          title: "EUR/USD",
        },
        {
          proName: "BITSTAMP:BTCUSD",
          title: "BTC/USD",
        },
        {
          proName: "BITSTAMP:ETHUSD",
          title: "ETH/USD",
        },
      ],
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en",
    });
    document.getElementById("ticker-tape").appendChild(script);
  }
};

export default TopBarMenu;
