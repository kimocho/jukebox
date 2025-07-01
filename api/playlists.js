import { getPlaylists, getPlaylist, newPlaylist } from "#db/queries/playlist";
import { getTrack, addTrack } from "#db/queries/tracks";
import express from "express";
const playlistRouter = express.Router();

playlistRouter.get('/', async (req, res) => {
  const playlists = await getPlaylists();
  if (!playlists) res.status(404).send('not found');
  res.send(playlists);
});

playlistRouter.post('/', async (req, res) => {
  if (!req.body || !req.body.name || !req.body.description) return res.status(400).send('no request body');
  const anotherPlaylist = await newPlaylist(req.body.name, req.body.description);
  res.status(201).send(anotherPlaylist);
});

playlistRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!+id) return res.status(400).send('not a number');
  const playlist = await getPlaylist(+id);
  if (!playlist) res.status(404).send('not found');
  res.send(playlist);
});

playlistRouter.get('/:id/tracks', (req, res) => {
  const { id } = req.params;
  if (!+id) return res.status(400).send('not a number');
  const track = getTrack(+id);
  res.send(track);
});

playlistRouter.post('/:id/tracks', async (req, res) => {
  const { id } = req.params;
  if (!+id) return res.status(400).send('not a number');
  if (!req.body || !req.body.name || !req.body.duration_ms) return res.status(400).send('no request body or required fields');
  const newTrack = await addTrack(req.body.name, req.body.duration_ms, +id);
  if (!newTrack) res.status(404).send('not found');
  res.send('posted');
});

export default playlistRouter;