// Middleware Imports
const jwt = require("jsonwebtoken");
const model = require("../models/posts");

// UserID decoder
const decodeUid = authorization => {
  const token = authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  return {
    id: decodedToken.userId,
    clearance: decodedToken.account
  };
};

// POST Create Post
exports.createPost = async (req, res) => {
  try {
    const user = await decodeUid(req.headers.authorization);

    if (!user) {
      throw new Error("Problème d'autorisation !");
    }
    const { title, content } = await req.body;

    if (!title || !content) {
      throw new Error("Un paramêtre est manquant !");
    }
    const newPost = await model.Post.create({
      userId: user.id,
      titlePost: title,
      content: content
    });
    if (!newPost) {
      throw new Error("Le nouveau post n'a pas été créé !");
    }
    res.status(200).json({ newPost });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// GET All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const allPosts = await model.Post.findAll({
      where: { active: true },
      order: [["id", "DESC"]]
    });
    if (!allPosts) {
      throw new Error("Un problème est survenu lors du chargement des posts !");
    }
    res.status(200).json({ allPosts });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// GET one post
// exports.getOnePost = async (req, res) => {
//   try {
//     const { id } = await req.params;
//     if (!id) {
//       throw new Error("Ce post n'existe plus ou est illisible !");
//     }
//     const onePost = await model.Post.findOne({
//       where: { id: id }
//     });
//     if (!onePost) {
//       throw new Error("Problème");
//     }
//     res.status(200).json({ onePost });
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// };

// GET all user's posts : réservé au modérateur
exports.getAllUsersPosts = async (req, res) => {
  try {
    const userId = req.params;
    if (!userId) {
      throw new Error("Cet utilisateur n'existe plus ou est illisible");
    }

    const allPosts = await model.Post.findAll({
      where: {
        userId: userId.id,
        active: true
      }
    });

    if (!allPosts) {
      throw new Error(
        "Les posts de cet utilisateur n'existent ou ne sont pas lisibles"
      );
    }
    res.status(200).json({ allPosts });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// PATCH Moderate Post
// Qu'est ce qu'il peut faire en tant que modérateur ? Supprimer, modifier ?
exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const onePost = await model.Post.update(
      { active: false },
      {
        where: { id: postId }
      }
    );
    if (!onePost) {
      throw new Error("Problème");
    }
    res.status(200).json({ onePost });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
