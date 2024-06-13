import { Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"
import TypingAnimation from "./animation";
import {motion} from 'framer-motion'
export const Index=()=>{
    const navigation=useNavigate();
    return <Paper className="fixed-top col-12 m-auto d-flex align-items-center w-100 h-100 ui-index-bg-img" >
        <section className="col-12 ">
        <div className="fs-2" style={{ padding: '20px',textAlign:'center',fontWeight:'bold',color:'white',textShadow:'1px 2px 1px black' }}>
      <TypingAnimation text="Heealth care Cost Prediction platform" speed={100} />
    </div>
    <div className="row col-12  m-auto">
    <div className="col-md-4 ">
        <motion.div initial={{ opacity: 1 }}
                        whileHover={{ opacity: 0.6 }}
                        transition={{ duration: 0.9 }} 
                         className="col-4 text-center m-auto" onClick={()=>navigation("/login")}>
                <div className=" p-1 card rounded-circle col-12"><img src="login.png" className="card-img   rounded-circle" alt="" /></div>
                <div className='text-center fw-bold'>Login</div>
            </motion.div>
            <section className="d-flex justify-content-between">
            <motion.div initial={{ opacity: 1 }}
                        whileHover={{ opacity: 0.6 }}
                        transition={{ duration: 0.9 }} 
                         className="col-4" onClick={()=>navigation("/sign-up")}>
                <div className=" p-1 card rounded-circle col-12"><img src="signup.png" className="card-img" alt="" /></div>
                <div className='text-center fw-bold'>signup</div>
            </motion.div>
            <motion.div initial={{ opacity: 1 }}
                        whileHover={{ opacity: 0.6 }}
                        transition={{ duration: 0.9 }} 
                         className="col-4" onClick={()=>navigation("/")}>
                <div className=" p-1 card rounded-circle col-12"><img src="home.png" className="card-img p-3 bg-primary rounded-circle" alt="" /></div>
                <div className='text-center fw-bold'>Home</div>
            </motion.div>
            
            </section>
        </div>

        <div className="col-md-7 me-md-3  d-flex align-items-center">
                <div className="col-md-8 m-auto  ">
                <b className="fs-1 mb-3" style={{fontFamily:'fantasy',color:'white',textShadow:'1px 2px 1px black'}}>Welcome to our Health care platform</b>
                <div className="fs-3  fw-bolder text-primary " style={{textShadow:'1px 1px 1px black'}}>
                We the premier Digital 
                Health Innovator
                </div>
                <div className="modal-footer">
                <Button variant="contained" className="fw-bold" onClick={()=>navigation("/login")}>get start</Button>
                </div>
                </div>
        </div>
    </div>
    </section>
    </Paper>
}