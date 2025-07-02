import { getPlaylists, getPlaylist, newPlaylist } from "#db/queries/playlist";
import { getTrack, addTrack, createPlaylistTrack, getTracksByPlaylist } from "#db/queries/tracks";
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

playlistRouter.get('/:id/tracks', async (req, res) => {
  const { id } = req.params;
  if (!+id) return res.status(400).send('bad request: not a number');
  const tracks = await getTracksByPlaylist(+id);
  if (tracks.length < 1) return res.status(404).send('not found');
  res.send(tracks);
});

playlistRouter.post('/:id/tracks', async (req, res) => {
  const { id } = req.params;
  const playlist = await getPlaylist(+id);
  if (!playlist) return res.status(404).send('not found');
  if (!req.body || !req.body.id || !req.body.trackId) return res.status(400).send('no request body or required fields');
  if (!+id) return res.status(400).send('not a number');
  const newTrack = await addTrack(playlist[+id], req.body.trackId);
  res.status(201).send(newTrack);
});

export default playlistRouter;