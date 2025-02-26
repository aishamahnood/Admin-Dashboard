import { useNavigate } from "react-router-dom";
import { FiHome, FiShoppingBag } from "react-icons/fi";
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import logo from "../../assets/app-logo.png";
import { FiCompass, FiShoppingCart, FiSettings,  } from "react-icons/fi";
import { FaHandshake,FaShoppingBag } from "react-icons/fa";
import { FaUser, FaStore } from "react-icons/fa"; // Icons import kiye
import { useDisclosure } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/userSlice";

const LinkItems = [
  { name: "Dashoard", icon: FiHome, path: "/" },
  // { name: "Shop", icon: FiShoppingBag, path: "/shop" },
  // { name: "Deliver", icon: FiShoppingBag, path: "/deliver" },
 // { name: "Products", icon: FiCompass, path: "/products" },
  //  { name: "Orders", icon: FiShoppingCart, path: "/orders" },
  //{ name: "Subscriptions", icon: FaHandshake, path: "/subscriptions" },
  {
    title: "Users",
    links: [
      { name: "User List", path: "/admin/users", icon: FaUser },
    ],
  },
  {
    title: "Vendors",
    links: [
      { name: "Vendor List", path: "/admin/vendors", icon: FaStore },
    ],
  },
  { name: "Complaints", icon: FiCompass, path: "/admin/complaints" },
  // { name: "Settings", icon: FiSettings, path: "/settings" },
  
];


const SidebarContent = ({ onClose, ...rest }) => {
 
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="200" alignItems="center" mx="8" justifyContent="space-between">
        <img
          src={logo}
          className="w-32"
          alt="tailus logo"
          style={{
            resizeMode: "contain",
            marginBottom: 20,
          }}
        />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link, index) => {
  if (link.links) {
    // Agar item ke andar links hain, to group ko render karega
    return (
      <Box key={index} mx="4">
        <Text fontWeight="bold" mt="4" mb="2" fontSize="md">
          {link.title}
        </Text>
        {link.links.map((subLink, subIndex) => (
          <NavItem key={subIndex} icon={subLink.icon} path={subLink.path}>
            {subLink.name}
          </NavItem>
        ))}
      </Box>
    );
  } else {
    // Normal links ko render karega
    return (
      <NavItem key={index} icon={link.icon} path={link.path}>
        {link.name}
      </NavItem>
    );
  }
})}

    </Box>
  );
};

const NavItem = ({ icon, path, children, ...rest }) => {
  const navigate = useNavigate()
  return (
    <Box
      onClick={() => navigate(path)}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {

  const { user } = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    const remove = localStorage.removeItem("user");
    dispatch(logoutUser())
    navigate("/login");
  };

  
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.data?.name ?? "Name goes here"}</Text>
                  <Text fontSize="xs" color="gray.600">
                  {user?.data?.role ?? "role goes here"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={() => navigate("/vendor/1")}>Profile</MenuItem>
              {/* <MenuItem>Settings</MenuItem> */}
              {/* <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              {/* <MenuItem onClick={() => navigate("/login")}>Sign out</MenuItem> */}
              <MenuItem
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
