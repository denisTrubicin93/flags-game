import asyncio
import websockets
import json
import argparse


async def wsrun(uri):
    async with websockets.connect(uri) as websocket:
        while True:
            print(await websocket.recv())

parser = argparse.ArgumentParser()
parser.add_argument('arg1', help='neutral/squat/kabeana/ball_strike')
args = parser.parse_args()

# loop = asyncio.get_event_loop()

# 接続
uri = 'ws://localhost:1234'
websocket = loop.run_until_complete(websockets.connect(uri))

# 送信
submit_data = {'cmd': 'set_coord_trans', 'x': 0.2,
               'y': 0.2, 'w': 0.6, 'h': 0.6, 'round_to_bounds': True}
if args.arg1 == 'neutral':
    submit_data = {'cmd': 'change_mode', 'mode': 'neutral'}
elif args.arg1 == 'squat':
    submit_data = {'cmd': 'change_mode', 'mode': 'squat', 'threshold': 100}
elif args.arg1 == 'kabeana':
    # submit_data = {'cmd': 'change_mode', 'mode': 'kabeana', 'reference_coordinates': {'NOSE': [100, 100], 'RIGHT_SHOULDER': [200, 200]}, 'radius': 50}
    submit_data = {'cmd': 'change_mode', 'mode': 'kabeana', 'pose': 0}
elif args.arg1 == 'ball_strike':
    submit_data = {'cmd': 'change_mode', 'mode': 'ball_strike', 'attack_keypoints': [
        'RIGHT_INDEX', 'LEFT_INDEX'], 'n_targets': 5, 'target_size': 45}
elif args.arg1 == 'foot-start':
    submit_data = {'cmd': 'foot_start'}
elif args.arg1 == 'foot-stop':
    submit_data = {'cmd': 'foot_stop'}
packet = '1236'
# packet = json.dumps(submit_data).encode()
loop.run_until_complete(websocket.send(packet))

loop.close()
print("Finish.")
