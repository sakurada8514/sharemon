import * as React from "react";

import { AppBar, Box, Toolbar, IconButton, Fab } from "@material-ui/core";
import { styled } from "@material-ui/styles";
// MenuIcon,AddIcon ,SearchIcon,MoreIcon
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

type BottomAppBarProps = {
  handleMobileSideMenuOpen: () => void;
};
const BottomAppBar: React.FC<BottomAppBarProps> = ({
  handleMobileSideMenuOpen,
}) => {
  return (
    <React.Fragment>
      <AppBar className="fixed top-auto bottom-0">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleMobileSideMenuOpen}
          >
            <MenuIcon className="w-7 h-7" />
          </IconButton>
          <IconButton color="inherit" className="ml-4">
            <HomeIcon className="w-7 h-7" />
          </IconButton>
          <Fab
            // color="secondary"
            aria-label="add"
            className="absolute -top-5 left-0 right-0 my-0 z-10 mx-auto bg-blue-200"
          >
            <AddIcon />
          </Fab>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <ListAltIcon className="w-7 h-7 mr-4" />
          </IconButton>
          <IconButton color="inherit">
            <PlaylistAddCheckIcon className="w-7 h-7" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default BottomAppBar;
