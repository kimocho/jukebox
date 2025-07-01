import { getPlaylists, getPlaylist, newPlaylist } from "#db/queries/playlist";
import express from "express";
const playlistRouter = express.Router();

playlistRouter.get('/', async (req, res) => {
  const playlists = await getPlaylists();
  if (!playlists) res.status(404).send('not found');
  res.send(playlists);
});

playlistRouter.post('/', async (req, res) => {
  if (!req.body || !req.body.name || !req.body.description) res.status(400).send('no request body');
  const anotherPlaylist = await newPlaylist(req.body.name, req.body.description);
  res.status(201).send(anotherPlaylist);
});

playlistRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const playlist = await getPlaylist(+id);
  if (!playlist) res.status(404).send('not found');
  res.send(playlist);
});

playlistRouter.get('/:id/tracks', (req, res) => {
  res.send('trackintheonething');
});

playlistRouter.post('/:id/tracks', (req, res) => {
  res.send('posted');
});

export default playlistRouter;