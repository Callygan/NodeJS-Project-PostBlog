import PostModel from '../models/Post.js';

export const getLastTags = async(req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts
        .map((obj) => obj.tags)
        .flat()
        .slice(0, 5);

        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Nu sa reusit primirea postarilor',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Nu sa reusit primirea postarilor',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

       const onePost = await PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewCount: 1 },
            },
            {
                returnDocument: 'after',
            }
            ).populate('user');

            if(!onePost){
                return res.status(404).json({
                    message: 'Postarea nu a fost gasita',
                });
            }

                res.json(onePost);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Nu sa reusit primirea postarilor',
        });
    }
};

// export const remove = async (req, res) => {
//     try {
//         const postId = req.params.id;

//        await PostModel.findOneAndDelete(
//         { 
//             _id: postId 
//         },
//         (err, doc) => {
//             if(err){
//                 console.log(err);
//                 return res.status(500).json({
//                     message: 'Nu sa primit stergergerea postarii',
//                 });
//             }
//             if(!doc){
//                 return res.status(404).json({
//                     message: 'Postarea nu a fost gasita',
//                 });
//             }
//             res.json({
//                 success: true,
//             });
//         },
//         );

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             message: 'Nu sa reusit de primit postarea',
//         });
//     }
// };

export const remove = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const deletedPost = await PostModel.findOneAndDelete({ _id: postId });
  
      if (!deletedPost) {
        return res.status(404).json({
          message: 'Postarea nu a fost gasita',
        });
      }
  
      res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Nu s-a reusit stergerea postarii',
      });
    }
  };

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId, 
        });

        const post = await doc.save();

        res.json(post);

    } catch (err) {
        console.log(err);
         res.status(500).json({
             message: 'Nu sa reusit crearea postarii',
         });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.userId,
                tags: req.body.tags.split(','),
            },
            );

            res.json({
                success: true,
            });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Nu sa primit de actualizat postarea',
        });
    }
};