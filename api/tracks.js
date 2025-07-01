import express from 'express';
const tracksRouter = express.Router();
import { getTracks, getTrack } from '../db/queries/tracks.js';

tracksRouter.get('/', async (req, res) => {
  const tracks = await getTracks();
  if (!tracks) res.status(404).send('not found');
  res.send(tracks);
});

tracksRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  // if ((typeof Number(id)) !== 'number') res.status(400).send('not a number');
  const track = await getTrack(+id);
  if (!track) res.status(404).send('not found');
  res.send(track);
});

export default tracksRouter;