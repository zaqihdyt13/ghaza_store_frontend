import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const RatingForm = ({ productId, userId, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      alert("Silakan pilih rating terlebih dahulu");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/ratings", {
        product_id: productId,
        user_id: userId,
        rating,
        comment,
      });
      alert("Rating berhasil dikirim!");
      setRating(0);
      setComment("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Gagal mengirim rating:", err);
      alert("Gagal mengirim rating");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((val) => (
          <span
            key={val}
            onClick={() => handleRatingClick(val)}
            className={`cursor-pointer text-2xl ${
              rating >= val ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Tulis komentar (opsional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border p-2 rounded"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Kirim Rating
      </button>
    </form>
  );
};

RatingForm.propTypes = {
  productId: PropTypes.number,
  userId: PropTypes.number,
  onSuccess: PropTypes.bool,
};

export default RatingForm;
