import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Box, List } from 'ui/components';
import { useNavigate } from 'react-router';
import { TSidebatItem } from './constants';

interface ISidebarProps {
  sidebarItemsFiltered: TSidebatItem[];
}

export default function Sidebar({ sidebarItemsFiltered }: ISidebarProps) {
  const navigate = useNavigate();

  const handleItemClick = (item: TSidebatItem) => {
    navigate(item.url);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'top',
        backgroundColor: 'primary.dark',
        color: 'secondary.contrastText',
        width: '200px',
        padding: 0,
      }}
    >
      <nav>
        <List>
          {sidebarItemsFiltered.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton onClick={() => handleItemClick(item)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.text}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
