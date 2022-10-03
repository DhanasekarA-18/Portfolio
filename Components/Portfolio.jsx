import { useState,useRef } from "react";
import Image from "next/image";
import Education from "./Education";
import WorkingHistory from "./WorkingHistory";
import Projects from "./Projects";
import Interests from "./Interests";
import ContactForm from "./ContactForm";
import Button from "./Button";
import { TypeWritting } from "./TypeWritting";
import { WhyChooseMe } from "./WhyChooseMe";
import Programming from "./Programming";
import styles from "../styles/Portfolio.module.scss";
import data from "../Data/PortfolioData.json";
import highlightDatas from "../Data/Portfoliohighlight.json";
import { toast } from "react-toastify";

export const Portfolio = () => {
  const [education, SetEducation] = useState(true);
  const [workHistory, SetWorkHistory] = useState(false);
  const [programmingSkills, SetProgrammingSkills] = useState(false);
  const [projects, SetProjects] = useState(false);
  const [interests, SetInterests] = useState(false);
  const handleEducation = (e) => {
    SetEducation(true);
    SetWorkHistory(false);
    SetProgrammingSkills(false);
    SetProjects(false);
    SetInterests(false);
  };
  const handleWork = (e) => {
    SetEducation(false);
    SetWorkHistory(true);
    SetProgrammingSkills(false);
    SetProjects(false);
    SetInterests(false);
  };
  const handleProgramming = (e) => {
    SetEducation(false);
    SetWorkHistory(false);
    SetProgrammingSkills(true);
    SetProjects(false);
    SetInterests(false);
  };
  const handleProjects = (e) => {
    SetEducation(false);
    SetWorkHistory(false);
    SetProgrammingSkills(false);
    SetProjects(true);
    SetInterests(false);
  };
  const handleInterests = (e) => {
    SetEducation(false);
    SetWorkHistory(false);
    SetProgrammingSkills(false);
    SetProjects(false);
    SetInterests(true);
  };
  const homeRef =useRef();
  const aboutRef =useRef();
  const resumeRef =useRef();
  const ContactRef =useRef();
  const handleHomeView=()=>{
    homeRef.current.scrollIntoView({behavior: "smooth"});
  }
  const handleAboutView=()=>{
    aboutRef.current.scrollIntoView({behavior: "smooth"});
  }
  const handleResumeView=()=>{
    resumeRef.current.scrollIntoView({behavior: "smooth"});
  }
  const handleContactView=()=>{
    ContactRef.current.scrollIntoView({behavior: "smooth"});
  }
  const handleDownload=()=>{
      toast.success("Resume Downloaded Successfully!");
  }

  return (
    <>

      <div className={styles.portfolioContainer} ref={homeRef}>
        <div className={styles.navbarContainer}>
          <div onClick={handleHomeView}>Home</div>
          <div onClick={handleAboutView}>About Me</div>
          <div onClick={handleResumeView}>Resume</div>
          <div onClick={handleContactView}>Contact Me</div>
        </div>

        <div className={styles.homeContainer}>
          <div className={styles.homePage}>
            <p>
              Hello, I'M <span className={styles.myName}>Dhanasekar</span>
            </p>
            <div className={styles.jobDescription}>
            <TypeWritting />
            </div>
            <p className={styles.aboutDescription}>
              {data.map((e, i) => (
                <span key={i}>{e[0].about}</span>
              ))}
            </p>
               
               <span>
                <a href="/Resume.pdf" download={"DhanasekarResume"} onClick={handleDownload}>
                <Button buttonName="Download Resume" />
                </a>
                </span>
                <span onClick={handleContactView}>
                <Button buttonName="Hire Me" />
                </span>
          </div>
          <div className={styles.profileImageContainer}>
            <Image
              src="/ds.jpg"
              width={400}
              height={400}
              alt={"Profile Image"}
              className={styles.profileImage}
            />
          </div>
        </div>
        <Image
          src="/borderbottom.png"
          width={3000}
          height={126}
          alt={"bordersvg"}
        />

        <div  ref={aboutRef}/>
        <div className={styles.aboutMeContainer}>
          <div className={styles.portTitle}>AboutMe</div>
          <div>
            <p className={styles.aboutDescription}>
              {" "}
              {data.map((e, i) => (
                <span key={i}>{e[0].skillset}</span>
              ))}
            </p>
          </div>
          <div className={styles.WhyChooseMeContainer}>
            <WhyChooseMe title="Why Choose Me?" />
          </div>
          {data.map((e, i) => (
            <>
              <p className={styles.highlightTitle} key={i}>
                {" "}
                {e[0].highlight}
              </p>
            </>
          ))}

          <div className={styles.highlightDatakeys}>
            <ul>
              {highlightDatas.map((e, i) => (
                <>
                  <li>{e[0].highlights} </li>
                </>
              ))}
            </ul>
          </div>
        </div>
        <Image
          src="/borderbottom.png"
          width={3000}
          height={126}
          alt={"bordersvg"}
        />
        <div ref={resumeRef}/>
        <div className={styles.resumeContainer} >
          <div className={styles.portTitle}>Resume</div>
          <div className={styles.WhyChooseMeContainer}>
            <WhyChooseMe title="My Bio Details" />
          </div>
          <div className={styles.resumeBox}>
            <div className={styles.box1}>
              <p onClick={handleEducation}>Education</p>
              <p onClick={handleWork}>Work History</p>
              <p onClick={handleProgramming}>Programming Skills</p>
              <p onClick={handleProjects}>Projects</p>
              <p onClick={handleInterests}>Interests</p>
            </div>

            <div className={styles.resumeChange}>
              {education && <Education />}
              {workHistory && <WorkingHistory />}
              {programmingSkills && <Programming />}
              {projects && <Projects />}
              {interests && <Interests />}
            </div>
          </div>
        </div>
        <Image
          src="/borderbottom.png"
          width={3000}
          height={126}
          alt={"bordersvg"}
        />
        <div ref={ContactRef}/>
        <ContactForm />
      </div>
    </>
  );
};
