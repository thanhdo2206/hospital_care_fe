import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { toast } from "react-toastify";

import ButtonCustomize from "../../../components/ButtonCustomize";
import {
  ICheckConditionFeedback,
  IFeedback,
} from "../../../interface/FeedbackInterface";
import { IMedicalExamination } from "../../../interface/MedicalExaminationInterface";
import {
  addFeedbackService,
  checkConditionFeedbackOfPatientService,
  getAllFeedbackMedicalService,
} from "../../../services/feedbackService";
import { RootState } from "../../../redux/configStore";
import { useSelector } from "react-redux";
import { getStorage } from "../../../utils/localStorage";
import { AUTH } from "../../../constants/constants";
import { ProgressListener } from "../../../components/Progress";
import Avatar from "react-avatar";

type Props = {
  medical?: IMedicalExamination | null;
  doctorId?: number;
};

export default function ReviewExamination(props: Props) {
  const { medical } = props;
  const { currentUser } = useSelector((state: RootState) => state.userSlice);
  const [isBookMedical, setIsBookMedical] = useState<boolean>();
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [inputFeedback, setInputFeedback] = useState<string>("");
  const isAuth = getStorage(AUTH);

  useEffect(() => {
    getAllFeedbacks();
    checkBookExaminate();
  }, [medical]);

  const getAllFeedbacks = async () => {
    if (medical?.id) {
      const data = await getAllFeedbackMedicalService(medical?.id as number);
      setFeedbacks(data);
    }
  };

  const renderFeedback = () => {
    if (feedbacks.length > 0) {
      return feedbacks.map((feedback, index) => {
        const { patientInformation, commentText, createdAt } = feedback;
        return (
          <div className="review_item" key={index}>
            <div className="avatar_patient">
              {patientInformation.avatar ? (
                <img src={patientInformation.avatar} alt="" />
              ) : (
                <Avatar facebookId="100008343750912" size="45" round={true} />
              )}
            </div>
            <div className="review_infor-container">
              <strong>
                {patientInformation.firstName +
                  " " +
                  patientInformation.lastName}
              </strong>
              <div className="date_review">
                <Moment fromNow>{createdAt}</Moment>
              </div>
              <p className="comment_text">{commentText}</p>
            </div>
          </div>
        );
      });
    }
  };

  const checkBookExaminate = async () => {
    if (isAuth) {
      const data: ICheckConditionFeedback =
        await checkConditionFeedbackOfPatientService(medical?.id as number);
      setIsBookMedical(data.isBooked);
    }
  };

  const onChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputFeedback(event.target.value);
  };

  const addFeedback = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isBookMedical) {
      toast.warn("You have not booked an appointment for this doctor yet");

      return;
    }

    if (medical) {
      ProgressListener.emit("start");

      await addFeedbackService(medical.id, inputFeedback);
      await getAllFeedbacks();
      setInputFeedback("");
      ProgressListener.emit("stop");
      toast.success("Your feedback was added successfully");
    }
  };

  return (
    <>
      <div className="reviews_container">{renderFeedback()}</div>
      {isAuth && isBookMedical ? (
        <div className="input_review">
          {currentUser.avatar ? (
            <img src={currentUser.avatar} alt="" />
          ) : (
            <Avatar style={{marginRight:'20px'}} facebookId="100008343750912" size="45" round={true} />
          )}
          <form action="" onSubmit={addFeedback}>
            <textarea
              name=""
              id="textarea_review"
              placeholder="Your review"
              onChange={onChangeTextarea}
              value={inputFeedback}
            ></textarea>
            <div>
              <ButtonCustomize
                text="Add comment"
                className="btn__comment"
                type="submit"
              />
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
