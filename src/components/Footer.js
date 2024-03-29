import React, { useEffect } from "react";
import { useDataLayerValue } from '../DataLayer'
import "../styles/Footer.css";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { Grid, Slider } from "@material-ui/core";

const Footer = ({ spotify }) => {

  const [{ item, playing }, dispatch] = useDataLayerValue()

  useEffect(() => {
    spotify.getMyCurrentPlaybackState().then((r) => {
      console.log(r)
      dispatch({
        type: 'SET_PLAYING',
        playing: r.is_playing
      })

      dispatch({
        type: 'SET_ITEM',
        item: r.item
      })
    })
    console.log('Music data', item);
  }, [spotify, dispatch])

  const handlePlayPause = () => {
    if (playing) {
      spotify.pause();
      dispatch({
        type: 'SET_PLAYING',
        playing: false
      })
    } else {
      spotify.play()
      dispatch({
        type: 'SET_PLAYING',
        playing: true
      })
    }
  }

  const skipNext = () => {
    spotify.skipToNext();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: 'SET_ITEM',
        item: r.item
      })
      dispatch({
        type: 'SET_PLAYING',
        playing: true
      })
    })
  }

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: "SET_ITEM",
        item: r.item,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
    });
  };

  return (
    <div className="footer">
      <div className="footer_left">
        <img className="footer_albumLogo" src={item?.album.images[0].url} alt="" />
        {item ? (
          <div className="footer_songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
            <div className="footer_songInfo">
              <h4>No song is playing</h4>
              <p>...</p>
            </div>
          )}
      </div>
      <div className="footer_center">
        <ShuffleIcon style={{ fontSize: "2rem" }} className="footer_green" />
        <SkipPreviousIcon
          onClick={skipNext}
          style={{ fontSize: "2rem" }}
          className="footer_icon"
        />
        {playing ? (
          <PauseCircleOutlineIcon
            style={{ fontSize: "4rem" }}
            onClick={handlePlayPause}
            fontSize="large"
            className="footer_icon"
          />
        ) : (
            <PlayCircleOutlineIcon
              style={{ fontSize: "4rem" }}
              onClick={handlePlayPause}
              fontSize="large"
              className="footer_icon"
            />
          )}
        <SkipNextIcon onClick={skipPrevious} style={{ fontSize: "2rem" }} className="footer_icon" />
        <RepeatIcon style={{ fontSize: "2rem" }} className="footer_green" />
      </div>
      <div className="footer_right">
        <Grid container spacing={2} className="grid">
          <Grid item>
            <PlaylistPlayIcon style={{ fontSize: "2rem" }} />
          </Grid>
          <Grid item>
            <VolumeDownIcon style={{ fontSize: "2rem" }} />
          </Grid>
          <Grid item xs>
            <Slider className="volume" aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
