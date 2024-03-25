import React, { useState } from "react";
import { Box, Heading, Flex, Avatar, Text, Button, Tabs, TabList, Tab, TabPanels, TabPanel, Table, Thead, Tbody, Tr, Th, Td, Input, Select, useToast } from "@chakra-ui/react";
import { FaUser, FaMoneyBillWave, FaCog } from "react-icons/fa";

const Index = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", balance: 5000 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", balance: 7500 },
  ]);
  const [transactions, setTransactions] = useState([
    { id: 1, customerId: 1, amount: 500, type: "deposit" },
    { id: 2, customerId: 2, amount: 1000, type: "withdrawal" },
  ]);
  const toast = useToast();

  const handleAddCustomer = () => {
    const newCustomer = {
      id: customers.length + 1,
      name: "New Customer",
      email: "newcustomer@example.com",
      balance: 0,
    };
    setCustomers([...customers, newCustomer]);
    toast({
      title: "Customer Added",
      description: "A new customer has been added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      customerId: 1,
      amount: 1000,
      type: "deposit",
    };
    setTransactions([...transactions, newTransaction]);
    toast({
      title: "Transaction Added",
      description: "A new transaction has been added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box p={8}>
      <Flex align="center" mb={8}>
        <Avatar size="lg" name="Santander Bank" src="https://images.unsplash.com/photo-1536522971180-dfb1cd2e5259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxiYW5rJTIwbG9nb3xlbnwwfHx8fDE3MTE0MDUzOTN8MA&ixlib=rb-4.0.3&q=80&w=1080" mr={4} />
        <Heading as="h1" size="xl">
          Santander Bank Admin Panel
        </Heading>
      </Flex>

      <Tabs index={selectedTab} onChange={(index) => setSelectedTab(index)}>
        <TabList>
          <Tab>
            <FaUser /> Customers
          </Tab>
          <Tab>
            <FaMoneyBillWave /> Transactions
          </Tab>
          <Tab>
            <FaCog /> Settings
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex justify="space-between" mb={4}>
              <Heading as="h2" size="lg">
                Customers
              </Heading>
              <Button colorScheme="blue" onClick={handleAddCustomer}>
                Add Customer
              </Button>
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th isNumeric>Balance</Th>
                </Tr>
              </Thead>
              <Tbody>
                {customers.map((customer) => (
                  <Tr key={customer.id}>
                    <Td>{customer.name}</Td>
                    <Td>{customer.email}</Td>
                    <Td isNumeric>${customer.balance}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel>
            <Flex justify="space-between" mb={4}>
              <Heading as="h2" size="lg">
                Transactions
              </Heading>
              <Button colorScheme="blue" onClick={handleAddTransaction}>
                Add Transaction
              </Button>
            </Flex>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Customer</Th>
                  <Th isNumeric>Amount</Th>
                  <Th>Type</Th>
                </Tr>
              </Thead>
              <Tbody>
                {transactions.map((transaction) => (
                  <Tr key={transaction.id}>
                    <Td>{customers.find((c) => c.id === transaction.customerId)?.name}</Td>
                    <Td isNumeric>${transaction.amount}</Td>
                    <Td>{transaction.type}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TabPanel>

          <TabPanel>
            <Heading as="h2" size="lg" mb={4}>
              Settings
            </Heading>
            <Box mb={4}>
              <Text mb={2}>Admin Email</Text>
              <Input type="email" placeholder="Enter admin email" />
            </Box>
            <Box mb={4}>
              <Text mb={2}>Notification Preferences</Text>
              <Select placeholder="Select option">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </Select>
            </Box>
            <Button colorScheme="blue">Save Settings</Button>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Index;
