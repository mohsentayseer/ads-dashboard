import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAd } from '../features/adsSlice';
import './AdsList.css';

  const AdsList = ({ onEdit }) => {
    const { adsList, status, error } = useSelector((state) => state.ads);
    const dispatch = useDispatch();
  
    const handleDelete = (id) => {
      dispatch(deleteAd(id));
    };
  
    if (status === 'loading') return <p>Loading ads...</p>;
    if (status === 'failed') return <p>Error loading ads: {error}</p>;

  return (
    <div className="ads-container">
  <h2 className="ads-title">Screen Ads</h2>
  <ul className="ads-list">
    {Array.isArray(adsList) ? (
      adsList.map((ad) => (
        <li key={ad.id} className="ad-item">
          <div className="ad-content">
            <h3 className="ad-type">{ad.video ? "Video Ad" : "Image Ad"}</h3>
            {ad.video && <video src={ad.video} controls className="ad-media" />}
            {ad.image && <img src={ad.image} alt="Img Ad" className="ad-media" />}
          </div>
          <div className="ad-actions">
            <p className="ad-time">Start Time: {ad.from_time}</p>
            <p className="ad-time">End Time: {ad.to_time}</p>
            <div className="action-buttons">
              <button className="edit-button" onClick={() => onEdit(ad)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(ad.id)}>Delete</button>
            </div>
          </div>
        </li>
      ))
    ) : (
      <p>No ads available</p>
    )}
  </ul>
</div>

  );
};

export default AdsList;
