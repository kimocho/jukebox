import express from "express";
import playlistRouter from "#api/playlists";
import tracksRouter from "#api/tracks";
const app = express();


app.use(express.json());

app.use('/playlists', playlistRouter);

app.use('/tracks', tracksRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Sorry! Something went wrong :(');
});

export default app;