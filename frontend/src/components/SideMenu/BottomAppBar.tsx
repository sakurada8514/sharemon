import * as React from "react";

import { AppBar, Box, Toolbar, IconButton, Fab } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PieChartIcon from "@material-ui/icons/PieChart";
import MoneyIcon from "@material-ui/icons/Money";
type BottomAppBarProps = {
  handleMobileSideMenuOpen: () => void;
};
const BottomAppBar: React.FC<BottomAppBarProps> = ({
  handleMobileSideMenuOpen,
}) => {
  return (
    <React.Fragment>
      <AppBar className="fixed top-auto bottom-0 bg-white">
        <Toolbar>
          <NavLink to="/mypage/budget" exact>
            <IconButton
              aria-label="open drawer"
              // onClick={handleMobileSideMenuOpen}
            >
              <MoneyIcon className="w-7 h-7" />
            </IconButton>
          </NavLink>
          {/* <IconButton
            aria-label="open drawer"
            onClick={handleMobileSideMenuOpen}
          >
            <MenuIcon className="w-7 h-7" />
          </IconButton> */}
          <NavLink to="/mypage" exact>
            <IconButton className="ml-4">
              <HomeIcon className="w-7 h-7" />
            </IconButton>
          </NavLink>
          <Box sx={{ flexGrow: 1 }} />
          <NavLink to="/mypage/regist" exact>
            <Fab color="primary" aria-label="add" className="w-12 h-12">
              <AddIcon />
            </Fab>
          </NavLink>
          <Box sx={{ flexGrow: 1 }} />
          <NavLink to="/mypage/list" exact>
            <IconButton className="mr-4">
              <ListAltIcon className="w-7 h-7" />
            </IconButton>
          </NavLink>
          <NavLink to="/mypage/graph" exact>
            <IconButton>
              <PieChartIcon className="w-7 h-7" />
            </IconButton>
          </NavLink>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default BottomAppBar;
