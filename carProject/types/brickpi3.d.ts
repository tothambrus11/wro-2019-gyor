declare class Motor {
    BP: any;
    port: any;
    constructor(BP: any, port: any);

    /**
     * Set the motor power in percent
     *
     * @param {number} power The power from -100 to 100, or -128 for float
     * @param {function<Promise>} breakFunction
     * @return {Promise}
     */
    setPower(power: number, breakFunction?: (...params: any) => boolean | Promise<boolean>): Promise<void>;

    /**
     * Set the motor target position in degrees
     *
     * @param {number} position The target position
     * @param {number} power If given, sets the power limit of the motor
     * @return {Promise} Resolves, when the target position is reached
     */
    setPosition(position: number, power?: number):Promise<void>;

    /**
     * Set the motor target position KP constant
     *
     * @param {number} kp The KP constant (default 25)
     * @return {Promise}
     */
    setPositionKp(kp: number): Promise<void>;

    /**
     * Set the motor target position KD constant
     *
     * @param {number} kd The KD constant (default 70)
     * @return {Promise}
     */
    setPositionKd(kd: number):Promise<void> ;

    /**
     * Set the motor target speed in degrees per second
     *
     * @param {number} dps The target speed in degrees per second
     * @return {Promise}
     */
    setDps(dps: number): Promise<void>;

    /**
     * Set the motor speed limit
     *
     * @param {number} power The power limit in percent (0 to 100), with 0 being no limit (100)
     * @param {number} dps The speed limit in degrees per second, with 0 being no limit
     * @return {Promise}
     */
    setLimits(power: number, dps: number): Promise<void>;

    /**
     * Read a motor status
     *
     * Returns a list:
     *      flags -- 8-bits of bit-flags that indicate motor status:
     *          bit 0 -- LOW_VOLTAGE_FLOAT - The motors are automatically disabled because the battery voltage is too low
     *          bit 1 -- OVERLOADED - The motors aren't close to the target (applies to position control and dps speed control).
     *      power -- the raw PWM power in percent (-100 to 100)
     *      encoder -- The encoder position
     *      dps -- The current speed in Degrees Per Second
     *
     * @return {Promise.<Array>}
     */
    getStatus(): Promise<any[]>;

    /**
     * Offset a motor encoder
     * Zero the encoder by offsetting it by the current position
     *
     * @param {number} position The encoder offset
     * @return {Promise}
     */
    setEncoder(position: number): Promise<void>;

    /**
     * Read a motor encoder in degrees
     *
     * Returns the encoder position in degrees
     *
     * @return {Promise.<number>}
     */
    getEncoder(): Promise<number>

    /**
     * Resets the encoder to 0 on its current position
     *
     * @return {Promise}
     */
    resetEncoder():Promise<void>
}