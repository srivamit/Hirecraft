---
license: mit
---
# NVIDIA FastPitch (uk-UA)

<style>
img {
 display: inline;
}
</style>

| [![Model architecture](https://img.shields.io/badge/Model_Arch-FastPitch--Transformer-lightgrey#model-badge)](#model-architecture)
| [![Model size](https://img.shields.io/badge/Params-45M-lightgrey#model-badge)](#model-architecture)
| [![Language](https://img.shields.io/badge/Language-uk--UA-lightgrey#model-badge)](#datasets)|

FastPitch [1] is a fully-parallel transformer architecture with prosody control over pitch and individual phoneme duration. Additionally, it uses an unsupervised speech-text aligner [2]. See the [model architecture](#model-architecture) section for complete architecture details.


## Usage

The model is available for use in the NeMo toolkit [3] and can be used as a pre-trained checkpoint for inference or for fine-tuning on another dataset.

To train, fine-tune or play with the model you will need to install [NVIDIA NeMo](https://github.com/NVIDIA/NeMo). We recommend you install it after you've installed the latest PyTorch version.

```
pip install nemo_toolkit['all']
```

### Automatically instantiate the model

Note: This model generates only spectrograms and a vocoder is needed to convert the spectrograms to waveforms.
In this example HiFiGAN is used.

```python
# Load Tokenizer
from huggingface_hub import hf_hub_download
hf_hub_download(
    repo_id="theodotus/tts_uk_fastpitch",
    filename="tokenizer.py",
    local_dir = "./"
)
# Load FastPitch
from nemo.collections.tts.models import FastPitchModel
spec_generator = FastPitchModel.from_pretrained("theodotus/tts_uk_fastpitch")
spec_generator.eval()
# Load vocoder
from nemo.collections.tts.models import HifiGanModel
vocoder = HifiGanModel.from_pretrained(model_name="theodotus/tts_uk_hifigan")
vocoder.eval()
```

### Generate audio

```python
# Speaker
# 0 - Mykyta
# 1 - Lada
# 2 - Tetiana
speaker = 0
import soundfile as sf
text = "К+ам'ян+ець-Под+ільський - м+істо в Хмельн+ицькій +області Укра+їни, ц+ентр Кам'ян+ець-Под+ільської міськ+ої об'+єднаної територі+альної гром+ади +і Кам'ян+ець-Под+ільського рай+ону."
parsed = spec_generator.parse(text)
spectrogram = spec_generator.generate_spectrogram(tokens=parsed, speaker=speaker)
audio = vocoder.convert_spectrogram_to_audio(spec=spectrogram)
```

### Save the generated audio file

```python
# Save the audio to disk in a file called speech.wav
sf.write("speech.wav", audio.to('cpu').detach().numpy()[0], 22050)
```


### Input

This model accepts batches of text.

### Output

This model generates mel spectrograms.

## Model Architecture

FastPitch is a fully-parallel text-to-speech model based on FastSpeech, conditioned on fundamental frequency contours. The model predicts pitch contours during inference. By altering these predictions, the generated speech can be more expressive, better match the semantic of the utterance, and in the end more engaging to the listener. FastPitch is based on a fully-parallel Transformer architecture, with a much higher real-time factor than Tacotron2 for the mel-spectrogram synthesis of a typical utterance. It uses an unsupervised speech-text aligner.


## Training

The NeMo toolkit [3] was used for training the models for 1000 epochs. These model are trained with this [example script](https://github.com/NVIDIA/NeMo/blob/main/examples/tts/fastpitch.py) and this [base config](https://github.com/NVIDIA/NeMo/blob/main/examples/tts/conf/fastpitch_align_v1.05.yaml).


### Datasets

This model is trained on LJSpeech sampled at 22050Hz, and has been tested on generating female English voices with an American accent.

## Performance

No performance information is available at this time.

## Limitations
This checkpoint only works well with vocoders that were trained on 22050Hz data. Otherwise, the generated audio may be scratchy or choppy-sounding.

## References
- [1] [FastPitch: Parallel Text-to-speech with Pitch Prediction](https://arxiv.org/abs/2006.06873)
- [2] [One TTS Alignment To Rule Them All](https://arxiv.org/abs/2108.10447)
- [3] [NVIDIA NeMo Toolkit](https://github.com/NVIDIA/NeMo)