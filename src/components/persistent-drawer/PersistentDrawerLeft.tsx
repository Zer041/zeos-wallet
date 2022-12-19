import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SendIcon from "@mui/icons-material/Send";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import ListIcon from "@mui/icons-material/List";
import ContactsIcon from "@mui/icons-material/Contacts";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../navigation/app-routes";
import UALLogin from "../ual-login/UalLogin";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import StarBorder from "@mui/icons-material/StarBorder";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({ children }: any) {
  const [openSubmenu, setOpenSubmenu] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpenSubmenu(!openSubmenu);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ display: "-webkit-inline-box" }}
        position="fixed"
        open={open}
        color="secondary"
        enableColorOnDark
      >
        <MenuIcon
          onClick={handleDrawerOpen}
          sx={{ margin: 2, ...(open && { display: "none" }) }}
        />
        <ChevronRightIcon
          onClick={handleDrawerClose}
          sx={{ margin: 2, ...(!open && { display: "none" }) }}
        />
        <div style={{ margin: 0, width: "90%", textAlign: "right" }}>
          <UALLogin />
        </div>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <div
            style={{
              width: "100%",
              textAlign: "left",
              display: "grid",
              fontWeight: "bold",
            }}
          >
            <span>ZEOS WALLET</span>
            <span>v1.0</span>
          </div>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              name: "Dashboard",
              icon: <DashboardIcon />,
              url: AppRoutes.Dashboard,
            },
            {
              name: "Send",
              icon: <SendIcon />,
              url: "/send",
            },
            {
              name: "Receive",
              icon: <CallReceivedIcon />,
              url: "/receive",
            },
            {
              name: "Transactions",
              icon: <ListIcon />,
              url: AppRoutes.Transactions,
            },
            {
              name: "AddressBook",
              icon: <ContactsIcon />,
              url: AppRoutes.AddressBook,
            },
          ].map((elem, index) => (
            <ListItem disablePadding>
              <ListItemButton component={Link} to={elem.url} key={elem.name}>
                <ListItemIcon>{elem.icon}</ListItemIcon>
                <ListItemText primary={elem.name} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="EOS" />
            {openSubmenu ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton component={Link} to={AppRoutes.Eos + AppRoutes.Anonymize} key={"Anonymize"} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Anonymize" />
              </ListItemButton>
              <ListItemButton component={Link} to={AppRoutes.Eos + AppRoutes.DeAnonymize} key={"DeAnonymize"} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="De-Anonymize" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
      <Main
        open={open}
        style={{ minHeight: "100vh", backgroundColor: "#515151" }}
      >
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
