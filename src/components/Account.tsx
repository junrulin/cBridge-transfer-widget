import { Button, Dropdown, Menu, Typography } from "antd";
import { useCallback } from "react";
import { createUseStyles } from "react-jss";
import { useWeb3Context } from "../providers/Web3ContextProvider";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { ModalName, openModal } from "../redux/modalSlice";
import { Theme } from "../theme/theme";
import { alpha2Hex } from "../helpers/alpha2Hex";
import { useWalletConnectionContext } from "../providers/WalletConnectionContextProvider";
import { useNonEVMContext, isNonEVMChain, getNonEVMMode, NonEVMMode } from "../providers/NonEVMContextProvider";
import IconWallet from '../images/wallet.svg';

const useStyles = createUseStyles<string, { isMobile: boolean }, Theme>((theme: Theme) => ({
  addressBtn: {
    marginLeft: props => (props.isMobile ? 0 : 8),
    height: props => (props.isMobile ? 22 : 44),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff",
    boxShadow: theme.primaryShadow,
    transition: "none !important",
    backdropFilter: "blur(20px)",
    border: `1px solid ${theme.primaryBorder} !important`,
    borderRadius: 12,
    minWidth: 50,
    fontWeight: props => (props.isMobile ? 400 : 700),
    padding: props => (props.isMobile ? "0px 8px" : ""),
    "& .ant-typography": {
      width: props => (props.isMobile ? 100 : 120),
      color: theme.primaryFont,
      "&:hover": {
        color: theme.highlightedFont,
      },
    },
    "&:hover": {
      filter: 'brightness(1.1)',
      boxShadow: '5px 5px 50px 10px rgb(215 255 30 / 7%)',
      backgroundColor: 'transparent',
      // background: theme.buttonHover,
      // color: theme.unityWhite,
      "& .ant-typography": {
        color: theme.highlightedFont,
      },
    },
  },

  buttonText: {
    position: "relative",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },

  connectBtn: {
    marginLeft: 8,
    height: 44,
    background: '#ffffff' || theme.primaryBrand,
    boxShadow: theme.primaryShadow,
    backdropFilter: "blur(20px)",
    border: `1px solid ${theme.primaryBorder} !important`,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "16px",
    color: theme.primaryFont,
    "& .ant-typography": {
      width: 120,
      color: theme.surfacePrimary,
    },
    "&:hover": {
      // background: theme.buttonHover,
      // color: theme.unityWhite,
      filter: 'brightness(1.1)',
      boxShadow: '5px 5px 50px 10px rgb(215 255 30 / 7%)',
      backgroundColor: 'transparent',
      color: theme.highlightedFont,
    },
    "&::before": {
      backgroundColor: `${theme.primaryBrand} !important`,
    },
  },
  dropDownMenu: {
    background: theme.secondBackground,
    borderRadius: "12px",
    padding: 0,
    "& .ant-dropdown-menu-item-active": {
      color: theme.surfacePrimary + alpha2Hex(70),
      background: theme.secondBackground,
    },
  },
  logoutBtn: {
    color: theme.surfacePrimary,
    textAlign: "center",
    borderRadius: "12px",
    fontSize: 14,
    fontWeight: 700,
    padding: "10px",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 24,
    verticalAlign: "middle",
    marginLeft: 8,
    background: theme.infoSuccess,
  },
}));

export default function Account(): JSX.Element {
  const { isMobile } = useAppSelector(state => state.windowWidth);
  const { fromChain } = useAppSelector(state => state.transferInfo);
  const classes = useStyles({ isMobile });
  const { logoutOfWeb3Modal } = useWeb3Context();
  const { logoutNonEVMModal, terraConnected } = useNonEVMContext();
  const { connected, walletAddress, walletConnectionButtonTitle } = useWalletConnectionContext();
  const dispatch = useAppDispatch();

  const showWalletConnectionProviderModal = useCallback(() => {
    const nonEVMMode = getNonEVMMode(fromChain?.id ?? 0);
    if (nonEVMMode === NonEVMMode.terraMainnet || nonEVMMode === NonEVMMode.terraTest) {
      dispatch(openModal(ModalName.terraProvider));
    } else if (nonEVMMode === NonEVMMode.flowMainnet || nonEVMMode === NonEVMMode.flowTest) {
      dispatch(openModal(ModalName.flowProvider));
    } else {
      dispatch(openModal(ModalName.provider));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, fromChain, terraConnected]);

  const walletConnectionLogout = () => {
    if (isNonEVMChain(fromChain?.id ?? 0)) {
      logoutNonEVMModal();
    } else {
      logoutOfWeb3Modal();
    }
  };

  if (connected) {
    const menu = (
      <Menu className={classes.dropDownMenu}>
        <Menu.Item className={classes.logoutBtn} key="logout" onClick={walletConnectionLogout}>
          Logout
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={["click", "hover"]}>
        <Button className={classes.addressBtn} type="ghost">
          <img src={IconWallet} style={{verticalAlign:"text-bottom", marginRight:'7px'}} alt="wallet icon" />
          <Typography.Text ellipsis={{ suffix: walletAddress.slice(-4) }}>
            {walletAddress.substr(0, 6) + "..."}
          </Typography.Text>
          {/* <span className={classes.indicator} /> */}
        </Button>
      </Dropdown>
    );
  }

  if (isMobile) {
    return <div />;
  }
  return (
    <>
      <Button type="primary" className={classes.connectBtn} onClick={showWalletConnectionProviderModal}>
        <img src={IconWallet} style={{verticalAlign:"text-bottom", marginRight:'7px'}} alt="wallet icon" />
        {walletConnectionButtonTitle}
      </Button>
    </>
  );
}
