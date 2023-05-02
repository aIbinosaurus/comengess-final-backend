const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  PutCommand,
  DeleteCommand,
  ScanCommand,
  UpdateCommand
} = require("@aws-sdk/lib-dynamodb");

const docClient = new DynamoDBClient({ regions: process.env.AWS_REGION });

// Get items from DynamoDB

// Get items from DynamoDB
exports.getItems = async (req, res) => {
  const params = {
    TableName: process.env.aws_items_table_name,
  };
  try {
    const data = await docClient.send(new ScanCommand(params));
    // console.log(data);
    res.send(data.Items);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// Add an item to DynamoDB
// Add an item to DynamoDB
exports.addItem = async (req, res) => {
  const created_date = Date.now();
  console.log(req);
  const item = { item_id:req.body.id ,...req.body, created_date: created_date };
  console.log("item");
  console.log(item);

  const params = {
    TableName: process.env.aws_items_table_name,
    Item: item
  }
  try {
    const data = await docClient.send(new PutCommand(params));
    res.send(data);
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// Delete an item from DynamDB
exports.deleteItem = async (req, res) => {
  console.log("deleteItem")
  const id = req.params.id;
  console.log(id)

  const params = {
    TableName: process.env.aws_items_table_name,
    Key: {
      item_id: id
    }
  }
  try {
    const data = await docClient.send(new DeleteCommand(params));
    res.send(data);
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
};
// Update an item in DynamoDB
exports.updateItem = async (req, res) => {
  console.log("updateItem")
  const item_id = req.params.id;
  console.log(item_id)

  const params = {
    TableName: process.env.aws_items_table_name,
    Key: {
      item_id: item_id
    },
    //update expression status from req.body.status
    //                SET status = req.body.status
    UpdateExpression:'SET #ts = :val1',
    ExpressionAttributeValues:{
      ":val1": req.body.status
    },
    ExpressionAttributeNames:{
      "#ts": "status"
    }
  }
  try {
    const data = await docClient.send(new UpdateCommand(params));
    res.send(data);
  } catch(err) {
    console.error(err);
    res.status(500).send(err);
  }
};
// Add an item to DynamoDB
// exports.addItem = async (req, res) => {
//   const item_id = uuidv4();
//   const created_date = Date.now();
//   console.log(req);
//   const item = { item_id: item_id, ...req.body, created_date: created_date };
//   console.log("item");
//   console.log(item);

//   const params = {
//     TableName: process.env.aws_items_table_name,
//     Item: item
//   }
//   try {
//     const data = await docClient.send(new PutCommand(params));
//     res.send(data);
//   } catch(err) {
//     console.error(err);
//     res.status(500).send(err);
//   }
// };