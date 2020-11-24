// Middleware Imports
const jwt = require("jsonwebtoken");
const model = require("../models/users");

// UserID decoder
const decodeUid = authorization => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return {
    id: decodedToken.userId,
    clearance: decodedToken.account
  };
};

// POST Create comment

exports.createComment = (req, res) => {
  const { postId, userId, comm } = req.body; // on doit récupérer postId et userId autrement
  console.log(model.Comment);
  // Query prepare
  model.Comment.create({
    postId: postId,
    userId: userId,
    comm: comm
  })
    .then(newComment => {
      res.status(201).json({ newComment });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
};

// GET All comments from a post
exports.getPostComments = (req, res) => {
  // il nous faut l'id du post, et les comm liés à cet id
  const { id } = req.params;

  // Query Prepare
  model.Comment.findAll({
    where: { postId: id },
    order: [["id", "DESC"]]
  }).then(allComments => {
    res.status(201).json({ allComments });
  });
};
