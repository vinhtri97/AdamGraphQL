import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    id: { type: String },
    email: { type: String },
    thumbnail: {
        type: String,
        default: "https://playerwatchtest.s3.amazonaws.com/PlayerWatch/user.png"
    },
    user_type: { type: String, default: "Player" },
    power_score: {
        type: Array,
        default: [
            {
                _id: false,
                value: -1,
                Date: new Date()
            }
        ]
    },
    spectators: {
        pending: { type: Array },
        accepted: { type: Array }
    },
    teams: {
        pending: { type: Array },
        accepted: { type: Array }
    },
    banner: { type: String },
    likes: { type: Array },
    videos: {
        pending: { type: Array },
        accepted: { type: Array }
    },
    personal: {
        first_name: { type: String },
        last_name: { type: String },
        dob: { type: String },
        phone: { type: String },
        gender: { type: String }
    },
    sport_info: {
        position: { type: String },
        secondary_position: { type: String },
        throwing: { type: String },
        batting: { type: String },
        sport: { type: String },
        committed: { type: String },
        committed_date: { type: String }
    },
    favorites: [{ type: mongoose.Types.ObjectId }],
    school_info: {
        grad_year: { type: String },
        school_district: { type: String },
        school: { type: String },
        school_type: { type: String }
    },
    address: {
        city: { type: String },
        state: { type: String },
        street: { type: String },
        zip: { type: Number }
    },
    statistics: {
        basketball: {
            quarter_court_sprint: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            laying_agility_drill: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            reactive_shuttle_run: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            full_court_dribbling: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            full_court_2_ball_dribbling: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            freethrow: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            three_pointer: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            five_yard_dash: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            }
        },
        baseball: {
            velocity: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            exit_speed: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            ball_fielding_100: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            longtoss: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            pop_time: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            home_to_second: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            }
        },
        soccer: {
            arrowhead_agility: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            yo_yo_recovery: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            endurance_test_30_sec: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            compass_drill: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            }
        },
        tennis: {
            court_sprint_3quarters: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            laying_agility_drill: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            reactive_shuttle_run: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            server_velocity: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            five_yard_dash: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            return_ball_velocity: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            }
        },
        volleyball: {
            court_sprint_3quarters: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            laying_agility_drill: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            reactive_shuttle_run: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            serve_velocity: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            five_yard_dash: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            wall_velocity: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            wall_spike: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            },
            forearm_pass_test: {
                value: {
                    type: Number
                },
                certified: {
                    type: Boolean
                },
                certifying_entity: {
                    type: String
                }
            }
        },
        academics: {
            ACT_Score: {
                type: Number
            },
            SAT_Score: {
                type: Number
            },
            GPA: {
                type: Number
            }
        },
        physical: {
            bmi: {
                height: {
                    type: Number
                },
                weight: {
                    type: Number
                }
            },
            extremity: {
                wing_span: {
                    type: Number
                },
                hand_size: {
                    type: Number
                },
                shoe_size: {
                    type: Number
                }
            },
            dominance: {
                hand_dominance: {
                    type: String
                },
                eye_dominance: {
                    type: String
                },
                leg_dominance: {
                    type: String
                }
            }
        },
        agility: {
            jump_score: {
                type: Number
            },
            agility_score: {
                type: Number
            },
            speed_score: {
                type: Number
            },
            core_score: {
                type: Number
            },
            movement: {
                ten_yard_shuttle: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                twenty_yard_shuttle: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                three_cone_drill: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                t_test: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                compass_agility: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                box_drill: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                quadrant_jump: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                }
            },
            speed: {
                ten_yard_dash: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                twenty_yard_dash: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                thirty_yard_dash: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                forty_yard_dash: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                fifty_yard_dash: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                sixty_yard_dash: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                ladder_drill: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                }
            },
            jump: {
                broad_jump: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                triple_jump: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                vertical_jump: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                one_step_vertical_jump: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                }
            }
        },
        power: {
            power_score: {
                type: Number
            },
            strength: {
                bench_press_80: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                bench_press_weight: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                bench_press_PR: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                squat_80: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                squat_weight: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                squat_PR: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                deadlift_80: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                deadlift_weight: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                deadlift_press_PR: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                push_up: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                chin_up: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                sit_up: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                plank: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                grip: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                sit_and_reach: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                stork_balance: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                }
            },
            throw: {
                overhead_throw: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                backwards_overhead_throw: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                },
                behind_the_head_throw: {
                    value: {
                        type: Number
                    },
                    certified: {
                        type: Boolean
                    },
                    certifying_entity: {
                        type: String
                    }
                }
            }
        }
    }
});

export default mongoose.model("Player", playerSchema);
